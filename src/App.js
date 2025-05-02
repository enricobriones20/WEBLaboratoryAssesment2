import React, { useState, useRef } from 'react';

const Form = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formValid, setFormValid] = useState(false);


  const emailRef = useRef(null);

  const [passwordStrength, setPasswordStrength] = useState('');

  const validateName = (name) => {
    if (!name) return 'Name is required';
    return '';
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return 'Email is required';
    if (!regex.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) return 'Passwords must match';
    return '';
  };


  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);

    
    const updatedErrors = { ...errors };
    updatedErrors.name = name === 'name' ? validateName(value) : errors.name;
    updatedErrors.email = name === 'email' ? validateEmail(value) : errors.email;
    updatedErrors.password = name === 'password' ? validatePassword(value) : errors.password;
    updatedErrors.confirmPassword = name === 'confirmPassword' ? validateConfirmPassword(value) : errors.confirmPassword;

    
    setErrors(updatedErrors);

  
    const isFormValid =
      !updatedErrors.name && !updatedErrors.email && !updatedErrors.password && !updatedErrors.confirmPassword;

    setFormValid(isFormValid);

    
    if (password.length > 0) {
      if (password.length < 8) setPasswordStrength('Weak');
      else if (password.length < 12) setPasswordStrength('Medium');
      else setPasswordStrength('Strong');
    } else {
      setPasswordStrength('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (formValid) {
      alert('Form Submitted Successfully');
    } else {
      alert('Please fix the errors');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        {errors.name && <span>{errors.name}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          ref={emailRef}
          required
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        {errors.password && <span>{errors.password}</span>}
        <p>Password Strength: {passwordStrength}</p>
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>

      <button type="submit" disabled={!formValid}>
        Submit
      </button>
    </form>
  );
};

export default Form;
