import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { register } from '../api/registerService';

function RegisterPage() {

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [organisation, setOrganisation] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   
   const handleRegistration = async () => {
      if (!email || !password) return;

      const result = await register(firstName, lastName, organisation, email, password);
      console.log('Login result:', result);

      if (result.success) {
            navigate('/');
      } else {
            alert(`Registration failed: ${result.error}`);
      }
   };

   return (
      <div className="registration-form">
            <h1>Registration page</h1>
            <div className="inputs">
               <input
                  type="text"
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
               />
               <input
                  type="text"
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
               />
               <input
                  type="text"
                  placeholder="Organisation"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
               />
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>

         <button className="register-btn" onClick={handleRegistration}>
            Register
         </button>
            
      </div>
   );
}

export default RegisterPage