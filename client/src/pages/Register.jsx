import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/register", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    // <div className="flex justify-center">
    //     <h2 className="text-4xl font-bold text-center text-black ">
    //       Bienvenue à
    //     </h2>
    //     <h2 className="text-4xl font-bold text-center text-orange-500">
    //       Supratours
    //     </h2>
    //   <Form layout="vertical" onFinish={onFinish}>
    //     <Form.Item label="Name"  name="name">
    //       <input
    //         type="text"

    //         placeholder="joe doe"
    //         // onChange={(e) => setPhonenumber(e.target.value)}
    //         className=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-orange-500 focus:bg-white focus:outline-none"
    //         autoFocus
    //         autoComplete="true"
    //         required
    //       />
    //     </Form.Item>
    //     <Form.Item label="Email" name="email">
    //       <input
    //         type="email"

    //         placeholder="test@gmail.com"
    //         // onChange={(e) => setPhonenumber(e.target.value)}
    //         className=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-orange-500 focus:bg-white focus:outline-none"
    //         autoFocus
    //         autoComplete="true"
    //         required
    //       />
    //     </Form.Item>
    //     <Form.Item label="Password" name="password" >
    //       <input
    //         type="password"

    //         placeholder="********"
    //         // onChange={(e) => setPhonenumber(e.target.value)}
    //         className=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-orange-500 focus:bg-white focus:outline-none"
    //         autoFocus
    //         autoComplete="true"
    //         required
    //       />
    //     </Form.Item>

    //     <button className="w-full block bg-orange-500 hover:bg-orange-400 focus:bg-orange-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
    //       Register
    //     </button>
    //     <div className="flex justify-center items-center mt-6">
    //       <Link
    //         to="/login"
    //         className="inline-block text-sm text-orange-500 align-baseline hover:text-orange-800"
    //       >
    //         Already have an account? Login!
    //       </Link>
    //     </div>
    //   </Form>
    // </div>
    <div
      className="bg-no-repeat bg-cover bg-center w-screen h-screen"
      style={{
        backgroundImage:
          "url(https://as1.ftcdn.net/v2/jpg/05/30/14/94/1000_F_530149440_dOufDGgeDawe2YaFgltTnPwqzHfgUVKy.jpg)",
      }}
    >
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
                <Form.Item label="Name" name="name">
                  <input
                    type="text"
                    placeholder="joe doe"
                    className=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-orange-500 focus:bg-white focus:outline-none"
                    autoFocus
                    autoComplete="true"
                    required
                  />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <input
                    type="email"
                    placeholder="test@gmail.com"
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
                    className=" px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-orange-500 focus:bg-white focus:outline-none"
                    autoFocus
                    autoComplete="true"
                    required
                  />
                </Form.Item>

              
                <div class="flex justify-center">
                  <button
                    class="bg-none cursor-pointer inline-block flex-shrink-0 text-2xl py-3 px-3 relative text-white no-underline z-10 font-bold
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
                    Register
                  </button>
                </div>
                <div className="flex justify-center items-center mt-6">
                  <Link
                     to="/login"
                    className="inline-block text-sm text-orange-500 align-baseline hover:text-orange-800"
                  >
                    Already have an account? Login!
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

export default Register;
