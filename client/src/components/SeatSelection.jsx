import { Card, Col, Row } from "antd";
import React from "react";

function SeatSelection({ selectedSeats, setSelectedSeats, bus }) {
  const capacity = bus.seats;
  const selectOrUnselectSeats = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div>
      <div className="bus-container w-[400px]">
        <Card>
          <Row gutter={[0, 5]}>
            {Array.from(Array(capacity).keys()).map((seat) => {
              let seatClass = ``;
              selectedSeats.includes(seat + 1);
              if (selectedSeats.includes(seat + 1)) {
                seatClass = `bg-orange-500 border-[2px] border-orange-500 text-center text-black text-base font-mono p-1 cursor-pointer w-10 h-10 rounded-tl-3xl rounded-br-3xl `;
              } else if (bus.seatsBooked.includes(seat + 1)) {
                seatClass = `bg-black border-[2px] border-black text-center text-white text-base font-mono p-1 cursor-pointer w-10 h-10 rounded-tl-3xl rounded-br-3xl `;
              }
              return (
                <Col span={6}>
                  <div className="flex justify-center">
                    <div className="border-[2px] border-gray-500 text-center text-black text-base font-mono p-1 cursor-pointer w-10 h-10 rounded-tl-3xl rounded-br-3xl ">
                      <div
                        className={`seat ${seatClass}`}
                        onClick={() => selectOrUnselectSeats(seat + 1)}
                      >
                        {seat + 1}
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default SeatSelection;
