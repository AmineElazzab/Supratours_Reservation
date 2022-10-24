import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/users/login", values);
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/home");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="flex justify-center columns-1">
      <h2 className="text-4xl font-bold text-center text-black ">
        Bienvenue à
      </h2>
      <h2 className="text-4xl font-bold text-center text-orange-500">
        Supratours
      </h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email">
          <input
            type="email"
            placeholder="test@gmail.com"
            // onChange={(e) => setPhonenumber(e.target.value)}
            className=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-orange-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="true"
            required
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <input
            type="password"
            placeholder="********"
            // onChange={(e) => setPhonenumber(e.target.value)}
            className=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-orange-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="true"
            required
          />
        </Form.Item>

        <button className="w-full block bg-orange-500 hover:bg-orange-400 focus:bg-orange-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
          Register
        </button>
        <div className="flex justify-center items-center mt-6">
          <Link
            to="/register"
            className="inline-block text-sm text-orange-500 align-baseline hover:text-orange-800"
          >
            Create an Account!
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
