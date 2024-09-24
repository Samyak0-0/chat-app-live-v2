import React, { ReactNode, createContext, useEffect, useState } from 'react'
import axios from 'axios'

export type StateContextType = {
    username: null | string;
    setUsername: React.Dispatch<React.SetStateAction<null>> |  React.Dispatch<React.SetStateAction<string>>;
    id: null | number;
    setId: React.Dispatch<React.SetStateAction<null>> |  React.Dispatch<React.SetStateAction<number>>;
};
  

export const UserContext = createContext<null | StateContextType>(null)

export const UserContextProvider = ({children} : {children: ReactNode}) => {

    const [username, setUsername] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
        axios.get('/profile').then(res => {
            setId(res.data.userId)
            setUsername(res.data.username)
        })
    },[])


    return (
        <UserContext.Provider value = {{username, setUsername, id, setId}}>
            {children}
        </UserContext.Provider>
    )
}