
import './index.css'
import axios from 'axios'

import Routes from './assets/Routes.js';

function App() {

  axios.defaults.baseURL = 'https://chat-app-live-v2.onrender.com';
  axios.defaults.withCredentials = true;
  

  return (

    
   <div className=' bg-slate-400'>
      <Routes />
   </div>
  )
}

export default App
