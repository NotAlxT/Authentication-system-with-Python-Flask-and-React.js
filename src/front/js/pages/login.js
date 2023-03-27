import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Context } from '../store/appContext'

export default function Login() {
    const {store, actions } = useContext(Context);
    const{email, setEmail} = useState("");
    const {password, setPassword} = useState("")
    const history = useHistory()

    const handleClick = () =>{
        actions.login(email, password).then(() => {
            history.push("/")
        })
    }

  return (<div className="text-center mt-5">
    <div>login</div>
    <div >
        <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        <button onClick={handleClick}>Login</button>
    </div>
 </div> )
}
