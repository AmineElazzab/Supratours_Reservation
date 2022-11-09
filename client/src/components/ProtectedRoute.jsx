import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import {useDispatch, useSelector} from 'react-redux';
import { SetUser } from "../redux/usersSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const [user, setLoading] = useState(true);
  // const [loading, setLoading] =  useSelector((state) => state.alerts);
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      const response = await axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLoading(false);
        dispatch(SetUser(response.data.data));
      } else {
        setLoading(false);
        localStorage.removeItem("token");
        message.error(response.data.message);
        navigate("/");
      }
    } catch (error) {
      localStorage.removeItem("token");
      message.error(error.message);
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  return <div> {!user && <DefaultLayout>{children}</DefaultLayout>}</div>;
}

export default ProtectedRoute;
