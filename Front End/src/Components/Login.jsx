import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');
    const navi = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault(); 
        try {
            const res = await axios.post('http://localhost:8080/api/login', { regNo, password });
            if (res.data && res.data.user) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navi('/profile');
                location.reload();
            } else {
                alert("Login failed: Invalid response from server");
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert("Login failed: Please check your credentials and try again");
        }
    };
    
    return (
        <section id="bg">
            <section id="login">
                <section>
                    <p>Some Contents Here</p>
                </section>
                <section className="formArea">
                    <h6>Login</h6>
                    <form method="post" action='' onSubmit={handleLogin}> {/* Call handleLogin on form submit */}
                        <label>Register Number</label>
                        <input id="regNo" placeholder="register number" type="tel" onChange={e => setRegNo(e.target.value)} />
                        <label>Password</label>
                        <input id="password" placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
                        <button type="submit" className="submit-btn">Submit</button> {/* Remove onClick event */}
                    </form>
                </section>
            </section>
        </section>
    );
}

export default Login;