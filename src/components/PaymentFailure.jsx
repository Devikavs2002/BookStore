import React from "react";

const PaymentFailure = () => {
  return (
    <div>
      <h1 className="text-center p-5 text-red-600 ">Payment Failure</h1>
      <div className="flex justify-center ">
        <img
          style={{ width: "400px" }}
          src="https://i0.wp.com/nrifuture.com/wp-content/uploads/2022/05/comp_3.gif?fit=800%2C600&ssl=1"
          alt="Failure"
        />
      </div>
    </div>
  );
};

export default PaymentFailure;
