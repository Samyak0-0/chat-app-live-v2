import { useContext, useState } from 'react'
import axios from 'axios';
import { UserContext } from './UserContext';


const RegisterAndLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('Login')

    const { setUsername: setLoggedInUsername, setId }: any = useContext(UserContext)


    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        const url = isLoginOrRegister === 'Register' ? 'register' : 'login'

        const { data } = await axios.post(url, { username, password })
        setLoggedInUsername(username)
        setId(data.id)

    }

    return (
        <div className=' w-full h-screen flex items-center justify-center'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='username' className='username p-3' />
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='password' className='password p-3' />
                    </div>
                    <button className="my-2 border-2 border-white w-full p-3 text-white">{isLoginOrRegister === 'Register' ? 'Register' : "Login"}</button>

                    <div>
                        {isLoginOrRegister === 'Register' && (
                            <div className=' text-indigo-900 font-semibold m-2'>
                                Already a member? &nbsp;<button onClick={() => setIsLoginOrRegister('Login')}>Login here</button>
                            </div>
                        )}
                    </div>

                    <div>
                        {isLoginOrRegister === 'Login' && (
                            <div className=' text-indigo-900 font-semibold m-2'>
                                Dont have an account? &nbsp;<button onClick={() => setIsLoginOrRegister('Register')}>Register here</button>
                            </div>
                        )}
                    </div>

                </form>
            </div>
        </div>
    )
}

export default RegisterAndLogin