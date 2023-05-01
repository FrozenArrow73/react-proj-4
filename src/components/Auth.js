import {useState} from 'react'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../store/authContext'
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()
 
       console.log('submitHandler called')

       const body = {
        username,
        password
       }

       if (register) {
        axios.post(`https://socialmtn.devmountain.com/register`, body).then((res) => {
            console.log(res.data)
            authCtx.login(res.data.token, res.data.exp, res.data.userId)
        }).catch((err)=> {
            console.log(err)
        })
       } else {
        axios.post(`https://socialmtn.devmountain.com/login`, body).then((res)=>{
            console.log(res.data)
            authCtx.login(res.data.token, res.data.exp, res.data.userId)
        }).catch((err) => {
            console.log(err)
        })
       }
   }
   const handleUsernameChange = (event) => {
        setUsername(event.target.value)
   }
   const handlePasswordChange = (event) => {
        setPassword(event.target.value)
   }
   const handleRegisterToggle = (event) => {
    setRegister((previousRegister) => {
        return !previousRegister
    })
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   type='text' 
                   className='form-input'
                   placeholder='Username'
                   value={username}
                   onChange={handleUsernameChange}/>
               <input
                   type='text' 
                   className='form-input'
                   placeholder='Password'
                   value={password}
                   onChange={handlePasswordChange}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button 
                className='form-btn'
                onClick={handleRegisterToggle}>
                    Need to {register ? 'Login' : 'Sign Up'}?
            </button>
       </main>
   )
}
 
export default Auth