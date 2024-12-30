import React, { useEffect } from "react";

const Payment = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://demo.myfatoorah.com/payment/v1/session.js";
    script1.async = true;
    document.body.appendChild(script1);
    const script2 = document.createElement("script");
    script2.src = "https://eg.myfatoorah.com/payment/v1/session.js";
    script2.async = true;
    document.body.appendChild(script2);
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div>
      <div id="embedded-payment"></div>
    </div>
  );
};

export default Payment;
