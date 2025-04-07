import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51R18EKCpl53whnrptCimWZj5ZHfqj9r8hcTw4KadGJ3C3DXb8v7wTcFOQPDZE0CAk8a2TUPDUPXHiYm9UhyyYX8i00oiPnBjVq");

const CheckoutForm = () => {
    const fetchClientSecret = useCallback(() => {
        return fetch("/cart/checkout-session", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => data.clientSecret);
    }, []);

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
};

export default CheckoutForm;