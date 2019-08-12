import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_uPHUTinbn6slvhkZz6v5ivJZ00qLLX0pM9'

    const onToken = token => {
        console.log(token)
        alert('Payment sucsessful')
    }

    return (
       <StripeCheckout
           label='Pay Now' 
           name='e-shop'
           billingAddress
           shippingAddress
           description={`Your total is $ ${price}`}
           amount={priceForStripe}
           panelLabel='Pay Now'
           token={onToken}
           stripeKey={publishableKey}
       />
    )
}

export default StripeCheckoutButton