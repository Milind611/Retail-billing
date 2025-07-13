import React from 'react'
import './ReceiptPopup.css'

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
  return (
    <div className="recipt-popup-overlay text-dark">
      <div className="recipt-popup">
        <div className="text-center mb-4">
          <i className="bi bi-check-circle-fill text-success fs-"></i>
        </div>

        <h3 className="text-center mb-4">Order Receipt</h3>
        <p>
          <strong>Order ID:</strong> {orderDetails?.orderId}
        </p>
        <p>
          <strong>Name:</strong> {orderDetails?.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {orderDetails?.phoneNumber}
        </p>

        <hr className="my-3" />
        <h5 className='mb-3'>Items Ordered</h5>
        <div className="cart-items-scroll">
          {orderDetails?.items?.map((item, index) => (
            <div key={index} className="d-flex justify-content-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="my-3" />
        <div className="d-flex justify-content-between mb-2">
          <span><strong>Subtotal:</strong></span>
          <span>{(orderDetails?.subtotal ?? 0).toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span><strong>Tax (1%):</strong></span>
          <span>{(orderDetails?.tax ?? 0).toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span><strong>Grand Total:</strong></span>
          <span>{(orderDetails?.grandTotal ?? 0).toFixed(2)}</span>
        </div>

        <p>
          <strong>Payment Method:</strong> {orderDetails?.paymentMethod}
        </p>

        {orderDetails?.paymentMethod === "UPI" && (
          <>
            <p><strong>Razorpay Order ID: </strong> {orderDetails?.paymentDetails?.razorpayOrderId}</p>
            <p><strong>Razorpay Payment ID: </strong> {orderDetails?.paymentDetails?.razorpayPaymentId}</p>
          </>
        )}

        <div className="d-flex justify-content-end gap-3 mt-4">
          <button className='btn btn-warning' onClick={onPrint}>Print Receipt</button>
          <button className='btn btn-danger' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default ReceiptPopup
