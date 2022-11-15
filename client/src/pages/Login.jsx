import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbars/AuthNavbar.js";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/users/login", values);
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href = "/home";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div
      className="bg-no-repeat bg-cover bg-center w-screen h-screen"
      style={{
        backgroundImage:
          "url(https://as1.ftcdn.net/v2/jpg/05/30/14/94/1000_F_530149440_dOufDGgeDawe2YaFgltTnPwqzHfgUVKy.jpg)",
      }}
    >
      <Navbar transparent />
      <div className="absolute bg-gradient-to-b from-black to-black opacity-75 inset-0 z-0" />

      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100  ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Email" name="email">
                  <div class="space-y-2">
                    <input
                      className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                      type="email"
                      autoComplete="true"
                      autoFocus
                      placeholder="mail@gmail.com"
                      required
                      
                    />
                  </div>
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <div classNmae="space-y-2">
                    <input
                      className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                      type="password"
                      autoComplete="true"
                      
                      placeholder="********"
                      required
                    />
                  </div>
                </Form.Item>
              
                  <div className="text-sm text-center">
                    <a className="text-orange-400 hover:text-orange-500 ">
                      Forgot your password?
                    </a>
                  </div>
               
                <div className="flex justify-center">
                  <button
                    className="bg-none cursor-pointer inline-block flex-shrink-0 text-2xl py-3 px-3 relative text-white no-underline z-10 font-bold
    before:bg-yellow-400 before:h-full before:absolute before:w-full before:-z-10 before:top-3 before:right-3
    after:border-black after:border-solid after:border-2 after:h-full after:opacity-100 after:absolute after:top-0 after:right-0 after:w-full
    hover:before:translate-x-3 hover:before:-translate-y-3
    hover:after:-translate-x-3 hover:after:translate-y-3
    hover:before:transition-transform hover:before:duration-500 hover:before:ease-in
    hover:after:transition-transform hover:after:duration-500 hover:after:ease-in
    after:transition-transform after:duration-500
    before:transition-transform before:duration-500
    "
                  >
                    Login
                  </button>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
