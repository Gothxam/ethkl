import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeCart } from "../../redux/sidebarCartSlice";
import { useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { BsTrash } from "react-icons/bs";
import { remove } from "../../redux/slice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart items and UI open state from correct reducers
  const cartItems = useSelector((state) => state.cart);
  const isCartOpen = useSelector((state) => state.sidebar.isCartOpen);

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate("/checkout");
  };

  const handleRemove = (id) => {
    dispatch(remove(id));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Offcanvas show={isCartOpen} onHide={() => dispatch(closeCart())} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-bold">Your Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        {cartItems.length === 0 ? (
          <div className="text-center text-muted mt-5">
            <p className="fs-5">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex-grow-1 overflow-auto">
            {cartItems.map((item, index) => (
              <div key={index} className="d-flex align-items-center mb-3 p-2 border-bottom">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-truncate" style={{ maxWidth: "180px" }}>{item.name}</h6>
                  <p className="mb-0 fw-bold text-success">₹{item.price}</p>
                </div>
                <Button variant="outline-danger" size="sm" onClick={() => handleRemove(item.id)}>
                  <BsTrash />
                </Button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-4 border-top pt-3">
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold fs-5">Subtotal:</span>
              <span className="fw-bold fs-5">₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button variant="dark" className="w-100 py-2 fs-5" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
