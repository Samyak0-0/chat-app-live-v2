
import RegisterAndLogin from '../components/RegisterAndLogin'
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import Chat from '../components/Chat';

type Props = {}

export default function Routes({}: Props) {

    const {username}: any = useContext(UserContext)

    if(username) {
        return <Chat />
    }
    
  return (
    <RegisterAndLogin />
  )
}