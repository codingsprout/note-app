import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [err, setErr] = useState('');

  const onChangeSubmit = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr('');
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/register', {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: '', email: '', password: '' });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <section>
      <div className='login'>
        <h2>Login</h2>
        <form>
          <input
            type='email'
            name='email'
            id='login-email'
            placeholder='Email'
            required
            value={user.email}
            onChange={onChangeSubmit}
          />

          <input
            type='password'
            name='password'
            id='login-password'
            placeholder='Password'
            required
            value={user.password}
            autoComplete='true'
            onChange={onChangeSubmit}
          />

          <button type='submit'>Login</button>
          <p>
            Don't have an account? <span>Register Now!</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>

      <div className='register'>
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
          <input
            type='text'
            name='name'
            id='register-name'
            placeholder='User name'
            required
            value={user.name}
            onChange={onChangeSubmit}
          />

          <input
            type='email'
            name='email'
            id='register-email'
            placeholder='Email'
            required
            value={user.email}
            onChange={onChangeSubmit}
          />

          <input
            type='password'
            name='password'
            id='register-password'
            placeholder='Password'
            required
            value={user.password}
            autoComplete='true'
            onChange={onChangeSubmit}
          />

          <button type='submit'>Register</button>
          <p>
            Have an account? What are you waiting for! <span>Login Now!</span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  );
};

export default Login;
