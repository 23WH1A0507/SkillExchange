import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useUser } from "../../util/UserContext";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.username || !form.password || !form.confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/register", {
        name: form.name,
        email: form.email,
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      setUser(data.data);
      toast.success("Registration successful");
      navigate("/discover");
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: "560px" }}>
        <h1 className="auth-title">Create your account</h1>
        <p style={{ color: "#a1b4b7", marginBottom: "28px", fontFamily: "Montserrat, sans-serif" }}>
          Join Skill Swap and start sharing skills with a professional community.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="registerName">
            <Form.Label className="auth-label">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="auth-input"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerEmail">
            <Form.Label className="auth-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="auth-input"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerUsername">
            <Form.Label className="auth-label">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="auth-input"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerPassword">
            <Form.Label className="auth-label">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter a password"
              className="auth-input"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="registerConfirmPassword">
            <Form.Label className="auth-label">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="auth-input"
            />
          </Form.Group>
          <Button type="submit" disabled={loading} className="auth-button">
            {loading ? "Creating account..." : "Register"}
          </Button>
        </Form>

        <div className="auth-footer-line">
          Already have an account?{' '}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
