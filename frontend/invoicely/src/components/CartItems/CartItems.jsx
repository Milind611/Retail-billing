import React, { useContext } from 'react';
import './CartItems.css';
import { AppContext } from '../context/AppContext';

const CartItems = () => {
  const { cartItems ,removeFromCart,updateQuantity} = useContext(AppContext);

  return (
    <div className="p-3 h-100 overflow-y-auto">
      {cartItems.length === 0 ? (
        <p>Your cart is empty..</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div className="cart-item mb-3 p-3 bg-dark rounded" key={index}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 text-light">{item.name}</h6>
                <p className="mb-0 text-light">
                  ₹ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={()=> updateQuantity(item.itemId,item.quantity-1)}
                    disabled={item.quantity === 1}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="text-light">{item.quantity}</span>
                  <button className="btn btn-primary btn-sm"
                    onClick={()=> updateQuantity(item.itemId,item.quantity+1)}
                  >

                    <i className="bi bi-plus"></i>
                  </button>
                </div>
                <button className="btn btn-danger btn-sm" style={{ width: 'auto' }}
                
                onClick={()=> removeFromCart(item.itemId)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
