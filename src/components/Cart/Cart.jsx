import React from 'react'
import './Cart.css'
import Button from '../Button/Button'

const Cart = ({ cartItems, onCheckout }) => {
  return (
    <div className="cart__container">
      <p>Umumiy narx: $12.00</p>
      <Button 
      title={`${cartItems.length === 0 ? 'Buyurtma berish' : "To'lov"
        }`}
        disable={cartItems.length === 0 ? true : false} 
        type={'checkout'} />
        onClick ={onCheckout}
    </div>
  )
}

export default Cart