import React from "react";
import { Button, Col, Form, message, Modal, Row } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";

function UserForm({
  showUserForm,
  setShowUserForm,
  type = "edit",
  getData,
  selectedUser,
  setSelectedUser,
}) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
     type === "edit"
        ? (response = await axiosInstance.put(
            `/api/users/${selectedUser._id}`,
            values
            ))
        : (response = await axiosInstance.post("/api/users/add-user", values));

        if (response.data.success) {
            message.success(response.data.message);
        } else {
            message.error(response.data.message);
        }
        getData();
        setShowUserForm(false);
        setSelectedUser(null);
        dispatch(HideLoading());
    } catch (error) {
        message.error(error.message);
        dispatch(HideLoading());
    }
    };

  return (
    <Modal
      width={1000}
      title={type === "edit" ? "Update User" : "Add User"}
      visible={showUserForm}
      onCancel={() => {
        setSelectedUser(null);
        setShowUserForm(false);
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedUser}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Name" name="name">
              <input
                type="text"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Email" name="email">
              <input
                type="text"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Phone" name="phone">
              <input
                type="number"
                className="w-full border border-orange-300 p-2 rounded"
                
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-center">
          <button
            className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );

  //   const dispatch = useDispatch();

  //   const onFinish = async (values) => {
  //     try {
  //       dispatch(ShowLoading());
  //       let response = null;
  //       if (type === "add") {
  //         response = await axiosInstance.post("/api/buses/add-bus", values);
  //       } else {
  //         response = await axiosInstance.put(
  //           `/api/buses/${selectedBus._id}`,
  //           values
  //         );
  //       }
  //       if (response.data.success) {
  //         message.success(response.data.message);
  //       } else {
  //         message.error(response.data.message);
  //       }
  //       getData();
  //       setShowBusForm(false);
  //       setSelectedBus(null);
  //       dispatch(HideLoading());
  //     } catch (error) {
  //       message.error(error.message);
  //       dispatch(HideLoading());
  //     }
  //   };
  //   //get all citys marocaine
  //   const { cities } = require("list-of-moroccan-cities");
  //   // const citys = cities.map((city) => {
  //   //   return {
  //   //     label: city.name,
  //   //     value: city.name,
  //   //   };
  //   // });

  //   return (
  //     <Modal
  //       width={1000}
  //       title={type === "add" ? "Add Bus" : "Update Bus"}
  //       visible={showBusForm}
  //       onCancel={() => {
  //         setSelectedBus(null);
  //         setShowBusForm(false);
  //       }}
  //       footer={false}
  //     >
  //       <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
  //         <Row gutter={[10, 10]}>
  //           <Col lg={24} xs={24}>
  //             <Form.Item label="Bus Name" name="name">
  //               <input
  //                 type="text"
  //                 className="w-full border border-orange-300 p-2 rounded"
  //               />

  //             </Form.Item>
  //           </Col>
  //           <Col lg={12} xs={24}>
  //             <Form.Item label="Bus Number" name="number">
  //               <input
  //                 type="text"
  //                 className="w-full border border-orange-300 p-2 rounded"
  //               />
  //             </Form.Item>
  //           </Col>
  //           <Col lg={12} xs={24}>
  //             <Form.Item label="Total Seats" name="seats">
  //               <input
  //                 type="number"
  //                 className="w-full border border-orange-300 p-2 rounded"
  //                 max="52"
  //                 min="52"
  //               />
  //             </Form.Item>
  //           </Col>
  //           <Col lg={12} xs={24}>
  //             <Form.Item label="From" name="from">
  //               <select className="w-full border border-orange-300 p-2 rounded">
  //                 {cities.map((city) => (
  //                   <option key={city.value} value={city.value}>
  //                     {city.label}
  //                   </option>
  //                 ))}
  //               </select>
  //             </Form.Item>
  //           </Col>
  //           <Col lg={12} xs={24}>
  //             <Form.Item label="To" name="to">
  //               <select className="w-full border border-orange-300 p-2 rounded">
  //                 {cities.map((city) => (
  //                   <option key={city.value} value={city.value}>
  //                     {city.label}
  //                   </option>
  //                 ))}
  //               </select>
  //             </Form.Item>
  //           </Col>
  //           <Col lg={8} xs={24}>
  //             <Form.Item label="Date" name="date">
  //               <input
  //                 type="date"
  //                 className="w-full border border-orange-300 p-2 rounded"
  //                 min={
  //                   type === "add" && "update"
  //                     ? new Date().toISOString().split("T")[0]
  //                     : selectedBus.date
  //                 }
  //               />
  //             </Form.Item>
  //           </Col>
  //           <Col lg={8} xs={24}>
  //             <Form.Item label="Departure Time" name="departureTime">
  //               <input
  //                 type="time"
  //                 className="w-full border border-orange-300 p-2 rounded"
  //               />
  //             </Form.Item>
  //           </Col>
  //           <Col lg={8} xs={24}>
  //             <Form.Item label="Arrival Time" name="arrivalTime">
  //               <input
  //                 type="time"
  //                 className="w-full border border-orange-300 p-2 rounded"
  //               />
  //             </Form.Item>
  //           </Col>
  //           <Col lg={12} xs={24}>
  //             <Form.Item label="Price" name="price">
  //               <input
  //                 type="number"
  //                 className="w-full border border-orange-300 p-2 rounded"
  //               />
  //             </Form.Item>
  //           </Col>
  //           <Col lg={12} xs={24}>
  //             <Form.Item label="Type" name="type">
  //               <select
  //                 className="w-full border border-orange-300 p-2 rounded"
  //                 name=""
  //                 id=""
  //               >
  //                 <option>Vip</option>
  //                 <option>Normal</option>
  //                 <option>Deluxe</option>
  //                 <option>Semi-Deluxe</option>
  //                 <option>Ordinary</option>
  //                 <option>Luxury</option>
  //               </select>
  //             </Form.Item>
  //           </Col>
  //           <Col lg={24} xs={24}>
  //             <Form.Item label="Status" name="status">
  //               <select
  //                 className="w-full border border-orange-300 p-2 rounded"
  //                 name=""
  //                 id=""
  //               >
  //                 <option value="Yet to start" defaultValue={
  //                   type === "add"
  //                     ? "Yet to start"
  //                     : selectedBus.status
  //                 }>Yet to start</option>
  //                 <option value="Running">Running</option>
  //                 <option value="Completed">Completed</option>
  //               </select>
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //         <div className="flex justify-center">
  //           <button
  //             className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
  //             type="submit"
  //           >
  //             Save
  //           </button>
  //         </div>
  //       </Form>
  //     </Modal>
  //   );
  // }
}
export default UserForm;
