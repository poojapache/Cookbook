import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import ContentContainer from './ContentContainer';

export default function VideoContainer() {
    const [pageContent, setPageContent] = useState('A');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [login, setLogin] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        if (password !== retypePassword) {
            alert('Passwords do not match');
            return;
        }

        const user = { email, username, password };
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup/`, user)
            .then(response => {
                alert('Sign up successful');
                setPageContent('A');
            })
            .catch(error => {
                console.error('There was an error signing up!', error);
            });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/login/`, user)
            .then(response => {
                setUserData(response.data);
                setLogin(true);
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
            });
    };

    const handleSignOut = () => {
        setLogin(false);
        setUserData(null);
    };

    const signUpForm = (
        <div className="primary-text">
            <form onSubmit={handleSignUpSubmit}>
                <table className="table sign-up-table">
                    <thead>
                        <tr>
                            <td colSpan="2"><h1>Sign Up</h1></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="form-label">Email</td>
                            <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td className="form-label">Username</td>
                            <td><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td className="form-label">Password</td>
                            <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td className="form-label">Retype Password</td>
                            <td><input type="password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="sign-up-btn-container"><button className="btn" type="submit">Submit</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );

    const loginForm = (
        <div className="primary-text">
            <form onSubmit={handleLoginSubmit}>
                <table className="table sign-up-table">
                    <thead>
                        <tr>
                            <td colSpan="2"><h1>Login</h1></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="form-label">Email</td>
                            <td><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td className="form-label">Password</td>
                            <td><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="sign-up-btn-container">
                                <button className="btn" type="submit">Submit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );

    return (
        !login ?
            <div className="main-container">
                <div className="video-container">
                    <video autoPlay loop muted className="video">
                        <source src="/background.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="overlay">
                    <div className="welcome-container">
                        <div className="top-bar">
                            <button className="btn login-btn" onClick={() => setPageContent('L')}>Login</button>
                            <button className="btn sign-up-btn" onClick={() => setPageContent('S')}>Sign Up</button>
                        </div>
                        {pageContent === 'A' ? (
                            <div className="primary-text">
                                <p>Bon Appétit<br /><span className="secondary-text">Let's cook something delicious!</span></p>
                            </div>
                        ) : (pageContent === 'S' ? signUpForm : loginForm)}
                    </div>
                </div>
            </div>
        :
            <ContentContainer userData={userData} onSignOut={handleSignOut} />
    );
}
