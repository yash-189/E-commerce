import { useCallback, useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Online_pay() {
  const Razorpay = useRazorpay();

  const navigate = useNavigate()

  const [resFromRazor, setResFromRazor] = useState("");
  const [double, setDouble] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = useCallback(async () => {


    let order;
    setDouble(true);
    setTimeout(() => {
      setDouble(false);
    }, 10000);

    const OrderUserDetails = JSON.parse(localStorage.getItem("user"));
    console.log(OrderUserDetails.name, "order user details");
    // alert("user order");

    setIsLoading(false);

    await axios
      .post("http://68.183.90.227:8080/checkout/payment/online/order", {

        payment: {
          "receipt": 1,
          "title": "home"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzQGdtYWlsLmNvbSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjYyNjIyMzQ5fQ.gFr-64dim_e_2bfCYGnVxT0D371rdsR1V2-wqwb41FM"

      })

      .then((res) => {
        console.log(res, "create order api");
        // console.log(res.data.order.id, "order id");
        // console.log(res.data.status, "order with status");
        // setIsLoading(true);

        order = res.data.order.id;
        if (res.data.status == false) {
          alert("failed ");
        } else {
          alert("pass");

          const options = {
            key: "rzp_test_MEUQ82ejpdGjUU",
            amount: "100000",
            currency: "INR",
            name: "Acme Corp",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order,

            prefill: {
              name: "Piyush Garg",
              email: "youremail@example.com",
              contact: "9999999999",
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },

            handler: (res) => {
              // console.log(res,"res from razor");
              setResFromRazor(res);

              axios
                .post("http://68.183.90.227:8080/checkout/payment/online/verify", {
                  response: res,
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIzQGdtYWlsLmNvbSIsInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjYyNjIyMzQ5fQ.gFr-64dim_e_2bfCYGnVxT0D371rdsR1V2-wqwb41FM"

                  //   name: OrderUserDetails.name,
                  //   email: OrderUserDetails.email,
                })
                .then((res) => {
                  console.log(res, "send verify");
                  // console.log(res.data, "send for verify");
                  alert("send for verify");
                  alert(res.data.status);


                })
                .catch((err) => {
                  console.log(err, "this is error order");
                });
            },
          };

          console.log(options);

          const rzpay = new Razorpay(options);
          rzpay.open();
        }
      })
      .catch((err) => {
        console.log(err, "this is error order");
      });

    // console.log(OrderUserDetails.username, "username order time");

    //console.log(id_pay,"id_pay")
  }, [Razorpay]);

  console.log(resFromRazor, "res usest");


  // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //   resFromRazor;

  return (
    <>
      <div className="">
        <h1 className="text-black">This is online payment</h1>
        <button className="btn btn-primary" disabled={double} onClick={handlePayment}>Click</button>
      </div>
    </>
  );
}