import { useContext, useEffect, useRef, useState } from "react"

import { UserContext } from "./UserContext"
import { uniqBy } from "lodash"
import axios from "axios"
import Contact from "./Contact"

type messages = {
    text: string,
    recipient?: string,
    sender?: string,
}

type attach = {
    name: string,
    data: string | ArrayBuffer | null,
}

const Chat = () => {

    const [ws, setWs] = useState<WebSocket | null>()
    const [onlinePeople, setOnlinePeople] = useState({})
    const [selectedContact, setSelectedContact] = useState<string>()
    const { username, id, setId, setUsername }: any = useContext(UserContext)

    const [messages, setMessages] = useState<messages[]>([])
    const [newMessageText, setNewMessageText] = useState("")
    const autoScroll = useRef<HTMLDivElement | null>(null);

    const [offlinePeople, setOfflinePeople] = useState({})

    useEffect(() => {
        connectToWs()
    }, [])

    function connectToWs() {
        const ws = new WebSocket('ws://localhost:4000')
        console.log(ws)
        setWs(ws)
        ws.addEventListener('message', handleMessage)
        ws.addEventListener('close', () => {
            setTimeout(() => {
                console.log("Disconnected trying to reconnect . . . ")
                connectToWs()
            }, 1000)

        })
    }

    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data)
        console.log({ ev, messageData })
        if ('online' in messageData) {
            showOnlinePeople(messageData.online)
        } else {
            if (messageData.sender === selectedContact) {
                setMessages(prev => ([...prev, { ...messageData }]))
            }
        }
    }

    const showOnlinePeople = (peopleArray) => {
        const people = {}
        peopleArray.forEach(({ userId, username }) => {
            people[userId] = username
        })
        setOnlinePeople(people)
    }


    function selectContact(userId: string) {
        setSelectedContact(userId)
    }

    const onlinePeopleExcludingUser = { ...onlinePeople }
    delete onlinePeopleExcludingUser[id]


    const messagesWithoutDupes = uniqBy(messages, '_id')

    function logout() {
        axios.post('/logout').then(() => {
            setWs(null);
            setId(null);
            setUsername(null);
        });
    }

    function sendMessage(ev, file: attach | null = null) {

        if (ev) ev.preventDefault();
        ws?.send(JSON.stringify({

            recipient: selectedContact,
            text: newMessageText,
            file,
        }));

        if (file) {
            axios.get('/messages/' + selectedContact).then(res => {
                setMessages(res.data)
            })
        } else {
            setNewMessageText('')
            setMessages(prev => ([...prev, {
                text: newMessageText,
                recipient: selectedContact,
                sender: id,
                _id: Date.now(),
            }]))
        }
    }

    function sendFile(ev) {
        const reader = new FileReader();

        reader.readAsDataURL(ev.target.files[0])
        reader.onload = () => {
            sendMessage(null, {
                name: ev.target.files[0].name,
                data: reader.result,
            })
        }

    }

    useEffect(() => {
        const divsrc = autoScroll.current
        if (divsrc) {
            divsrc.scrollTo({ top: divsrc.scrollHeight, behavior: "smooth" })
        }
    }, [messages])

    useEffect(() => {
        if (selectedContact) {
            axios.get('/messages/' + selectedContact).then(res => {
                setMessages(res.data)
            })
        }
    }, [selectedContact])

    useEffect(() => {
        axios.get('/people').then(res => {
            const offlinePplArray = res.data
                .filter(p => p._id !== id)
                .filter(p => !Object.keys(onlinePeople).includes(p._id))

            const offlinePpl = {}
            offlinePplArray.forEach(e => {
                offlinePpl[e._id] = e;
            });
            setOfflinePeople(offlinePpl)
        })
    }, [onlinePeople])

    return (
        <div className=" flex h-screen w-screen">
            <div className="bg-neutral-700 w-1/3 text-white flex flex-col">
                <div className="py-3 px-2 text-2xl font-semibold h-1/10">Contacts</div>
                <div className="flex flex-col overflow-x-hidden">
                    <div className="mt-2 flex flex-col flex-grow overflow-y-scroll">
                        {Object.keys(onlinePeopleExcludingUser).map(userId => (

                            <Contact
                                key={userId}
                                userId={userId}
                                username={onlinePeopleExcludingUser[userId]}
                                onClickk={() => selectContact(userId)}
                                selectedContact={selectedContact}
                                online={true} />

                        ))}

                        {Object.keys(offlinePeople).map(userId => (

                            <Contact
                                key={userId}
                                userId={userId}
                                username={offlinePeople[userId].username}
                                onClickk={() => selectContact(userId)}
                                selectedContact={selectedContact}
                                online={false} />

                        ))}


                    </div>
                    <div className="text-center text-gray-200 flex-grow-0">
                        <p>{username}</p>
                        <button
                            onClick={logout}>logout</button>
                    </div>
                </div>
            </div>
            <div className=" bg-slate-200 w-2/3 flex flex-col justify-between">
                <div ref={autoScroll} className="flex-grow overflow-y-scroll">
                    {!selectedContact && (
                        <div className="h-full w-full flex justify-center items-center text-neutral-400">&larr; Select a Conversation to get Started !</div>
                    )}

                    {selectedContact && (
                        <div >
                            {messagesWithoutDupes.map(msg => (
                                <div key={msg._id} className={" flex flex-col text-white " + (msg.sender === id ? "items-end" : "")}>
                                    <div className={"py-2 block px-5 rounded-lg w-fit m-3 " + (msg.sender === id ? "bg-blue-500" : "bg-neutral-600 ")}>
                                        {msg.text}
                                        {msg.file && (
                                            <a href={axios.defaults.baseURL + '/uploads/' + msg.file} target="_blank">
                                                {msg.file}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedContact && (
                    <form className="flex gap-1 mx-2 my-3" onSubmit={sendMessage}>
                        <input type="text" value={newMessageText} onChange={ev => setNewMessageText(ev.target.value)} name="" id="" placeholder="Type your message here . . ." className=" w-full px-3 rounded-md " />
                        <label>
                            <input type="file" className="hidden" onChange={sendFile} />
                            attach
                        </label>
                        <button type="submit" className=" p-2 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </form>
                )}


            </div>
        </div>
    )
}

export default Chat