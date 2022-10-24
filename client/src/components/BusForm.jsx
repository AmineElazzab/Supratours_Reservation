import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import moment from "moment";




function BusForm({ showBusForm, setShowBusForm, type = "add" }) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
        dispatch(ShowLoading());
        let response = null;
        if(type === "add"){
            response = await axiosInstance.post("/api/buses/add-bus", {
                ...values,
                date: moment(values.date).format("DD/MM/YYYY"),
            } )
        }
        else{
        }
        if(response.data.success){
            message.success(response.data.message);
        }
        else{
            message.error(response.data.message);
        }
        dispatch(HideLoading());
    } catch (error) {
        message.error(error.message);
        dispatch(HideLoading());
    }
  };

  return (
    <Modal
      width={1000}
      title="Add Bus"
      visible={showBusForm}
      onCancel={() => setShowBusForm(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="name">
              <input
                type="text"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Number" name="number">
              <input
                type="text"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Total Seats" name="seats">
              <input
                type="text"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from">
              <input
                type="text"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to">
              <input
                type="text"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Date" name="date">
              <input
                type="date"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Departure Time" name="departureTime">
              <input
                type="time"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Arrival Time" name="arrivalTime">
              <input
                type="time"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Price" name="price">
              <input
                type="number"
                className="w-full border border-orange-300 p-2 rounded"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Type" name="type">
              <input
                type="text"
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
}

export default BusForm;
