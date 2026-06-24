import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../util/UserContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!form.email && !form.username) || !form.password) {
      toast.error("Enter email or username and password");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/login", {
        email: form.email,
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      setUser(data.data);
      toast.success("Login successful");
      navigate("/discover");
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p style={{ color: "#a1b4b7", marginBottom: "28px", fontFamily: "Montserrat, sans-serif" }}>
          Enter your credentials to continue learning and connecting with mentors.
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label className="auth-label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="auth-input"
            />
            <Form.Text style={{ color: "#7e8a8f" }}>You may also login with username.</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginUsername">
            <Form.Label className="auth-label">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="auth-input"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="loginPassword">
            <Form.Label className="auth-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="auth-input"
            />
          </Form.Group>

          <Button type="submit" disabled={loading} className="auth-button">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>

        <div className="auth-footer-line">
          Don&apos;t have an account?{' '}
          <span className="auth-link" onClick={() => navigate("/register")}>Register now</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
