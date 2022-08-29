import React from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";



let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51Lc7B5LlkUjkLL5ybliEWTsgozQfozu1bQszv5TnsmgPxVlZWNDwuLlh6hwayzuQ7ugMdgAVuRLDQ9reGkvvGVba00DWLjKDtJ')
    // (process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const Checkout = () => {
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1Lc7CoLlkUjkLL5yp67iCDVo",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <h1>Stripe Checkout</h1>
      <p className="checkout-title">Design+Code React Hooks Course</p>
      <p className="checkout-description">
        Learn how to build a website with React Hooks
      </p>
      <h1 className="checkout-price">$19</h1>
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
          <div className="purple-circle">
            {/* <img className="icon" src={CardIcon} alt="credit-card-icon" /> */}
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    </div>
  );
};

export default Checkout;
//REACT_APP_STRIPE_KEY="pk_test_51LaziwSHlNeSK1y2ESbOrqiUemnTfuVR8PwpI2Uct8HkxF2FToQks9i6nrej8H5NdRCR2aMhxvOBO2Sl6RinBcxb00BKG49Df3"