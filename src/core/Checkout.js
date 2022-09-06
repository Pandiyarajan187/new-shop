import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import authContext from "../context/authContext";



let stripePromise;
let cart = JSON.stringify(localStorage.getItem('cart'))
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51Lc7B5LlkUjkLL5ybliEWTsgozQfozu1bQszv5TnsmgPxVlZWNDwuLlh6hwayzuQ7ugMdgAVuRLDQ9reGkvvGVba00DWLjKDtJ')
        // (process.env.REACT_APP_STRIPE_KEY);
    }
    
    return stripePromise;
};


const Checkout = () => {
    const { getItem ,getCartItem } = useContext(authContext)
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const item = {
    price: "price_1Lc7CoLlkUjkLL5yp67iCDVo",
    quantity: 1
  };
  useEffect(()=>{
    getCartItem()
    },[])
    
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
      <h1 className="checkout-price">Rs. {getItem.reduce((total, item) => total + (item.price * item.quantity), 0)}</h1>
      {console.log(getItem)}
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
            <button   className="btn btn-primary">
          <p>{isLoading ? "Loading..." : "Buy"}</p>
            </button>
        </div>
      </button>
    </div>
  );
};

export default Checkout;