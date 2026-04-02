import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required';
    }

    if (!emailRegex.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setServerError('');

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });

      navigate('/login', {
        replace: true,
        state: { message: 'Registration successful. Please login.' }
      });
    } catch (error) {
      setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page auth-page">
      <div className="card auth-card">
        <h1>Register</h1>
        <p>Create your account to continue.</p>

        <form onSubmit={onSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={onChange}
            placeholder="Enter your name"
          />
          {errors.name ? <small className="error">{errors.name}</small> : null}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter email"
          />
          {errors.email ? <small className="error">{errors.email}</small> : null}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            placeholder="Enter password"
          />
          {errors.password ? <small className="error">{errors.password}</small> : null}

          {serverError ? <small className="error server">{serverError}</small> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
