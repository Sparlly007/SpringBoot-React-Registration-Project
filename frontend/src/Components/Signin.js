import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login({ props }) {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('http://localhost:8080/registration/signin', user,
            {
                withCredentials: 'include', //Enables sending cookies from api to browser
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                console.log(res);
                navigate('/home')
            })
            .catch((error) => {
                if (error.response.data.fieldErrors) {
                    var fieldErrors = error.response.data.fieldErrors;
                    var newErrors = {
                        email: '',
                        password: '',
                        unauthorized: ''
                    };
                    fieldErrors.forEach(fieldError => {
                        newErrors[fieldError.field] = fieldError.message;
                    })
                    setErrors(newErrors);
                    console.log(newErrors);
                }
            });
    }

    const handleChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value
        });
    }

    const errorList = Object.entries(errors).map(([error, message]) => {
        if (message)
            return (
                <div>
                    <label style={{ color: 'red' }}>{message}</label>
                    <br></br>
                </div>
            )
    })

    return (
        <div className="container">
            <h1>Sign In</h1>

            <div>{errorList}</div>

            <form onSubmit={handleSubmit}>

                <div class="form-group">
                    <label>
                        Email:
                        <input type="text" name="email" id="email" value={user.email} onChange={handleChange} />
                    </label>
                </div>

                <div class="form-group">
                    <label>
                        Password:
                        <input type="password" name="password" id="password" value={user.password} onChange={handleChange} />
                    </label>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-success">Login</button><br></br>
                    <Link to="/signup">Register here.</Link>
                </div>

            </form>
        </div>
    );
}

