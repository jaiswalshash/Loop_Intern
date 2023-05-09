import React, { useState, useEffect } from 'react';
import "./signIn.css"
import { useNavigate, NavLink } from "react-router-dom";

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const token = "keyfXgn8PL6pB3x32";
  const [data, setResult] = React.useState();
  const [showComponent, setShowComponent] = useState(false);
    const [showWarning, setWarning] = useState("hidden");
    // function handleClick() {
    //     if (!showComponent) {
    //         setWarning("text");
    //     }
    // }
    // let button;
    // if (showComponent) {
    //     button = <NavLink to = "/home" > <button id="login-button" type="submit">Login</button></NavLink>
    // }
    // else {
    //     button =  <NavLink to = "/sign_in" ><button id="login-button" type="submit" onClick={handleClick}>Login</button></NavLink>
    // }
    
  useEffect(()=>{
    fetch('https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view', {
      method: "GET",
      headers: {"Authorization": `Bearer ${token}`}
    }).then(res => res.json()).then(json => setResult(json));
    console.log(data);
  },[]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    for(var i = 0; i < data.records.length; i++)  {
        if (data.records[i].fields.username === username && data.records[i].fields.password === password) {
          localStorage.setItem('isLoggedIn', 'true');
          navigate("/home");
        }
    }
    if (localStorage.getItem('isLoggedIn')!= 'true')alert("Wrong Password")
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} autoComplete = "off"
            required = {true} onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} autoComplete = "off"
          required = {true} onChange={handlePasswordChange} />
      </div>
      <input 
          id = "warning"
          type= {showWarning}
          placeholder="Wrong E-mail or password!!"
      />
      <div className="forget-password"><h4>Forget Password?</h4></div>
      {/* {button} */}
      <button className='submit' type="submit">Sign In</button>
    </form>
  );
}

export default SignInPage;
