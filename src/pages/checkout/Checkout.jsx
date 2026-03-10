import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order placed successfully! (UI Dummy)");
        navigate("/");
    };

    return (
        <Container className="py-5" style={{ minHeight: "80vh" }}>
            <h2 className="mb-4 fw-bold">Checkout</h2>
            <Row className="g-5">
                <Col md={7} lg={8}>
                    <Card className="shadow-sm border-0 document.querySelector">
                        <Card.Body className="p-4">
                            <h4 className="mb-3">Billing & Shipping Details</h4>
                            <Form onSubmit={handleSubmit}>
                                <Row className="g-3">
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control type="text" placeholder="First name" required />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Group>
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control type="text" placeholder="Last name" required />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="you@example.com" required />
                                        </Form.Group>
                                    </Col>

                                    <Col xs={12}>
                                        <Form.Group>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" placeholder="1234 Main St" required />
                                        </Form.Group>
                                    </Col>

                                    <Col md={5}>
                                        <Form.Group>
                                            <Form.Label>Country</Form.Label>
                                            <Form.Select required>
                                                <option value="">Choose...</option>
                                                <option>India</option>
                                                <option>United States</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>State</Form.Label>
                                            <Form.Select required>
                                                <option value="">Choose...</option>
                                                <option>Maharashtra</option>
                                                <option>Delhi</option>
                                                <option>Karnataka</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={3}>
                                        <Form.Group>
                                            <Form.Label>Zip</Form.Label>
                                            <Form.Control type="text" placeholder="" required />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr className="my-4" />
                                <Button variant="dark" type="submit" className="w-100 py-3 fs-5 fw-bold">
                                    Place Order
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={5} lg={4}>
                    <Card className="shadow-sm border-0 px-2 py-3 bg-light">
                        <Card.Body>
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-secondary">Your Order</span>
                                <span className="badge bg-secondary rounded-pill">{cartItems.length}</span>
                            </h4>
                            <ul className="list-group mb-3">
                                {cartItems.length === 0 ? (
                                    <li className="list-group-item d-flex justify-content-between lh-sm">
                                        <div>
                                            <h6 className="my-0">No items</h6>
                                        </div>
                                    </li>
                                ) : (
                                    cartItems.map((item, idx) => (
                                        <li key={idx} className="list-group-item d-flex justify-content-between lh-sm bg-transparent">
                                            <div>
                                                <h6 className="my-0 text-truncate" style={{ maxWidth: '200px' }}>{item.name}</h6>
                                                <small className="text-muted">Qty: 1</small>
                                            </div>
                                            <span className="text-muted">₹{item.price}</span>
                                        </li>
                                    ))
                                )}

                                <li className="list-group-item d-flex justify-content-between bg-transparent">
                                    <span>Subtotal</span>
                                    <strong>₹{subtotal.toFixed(2)}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between bg-transparent">
                                    <span>Shipping</span>
                                    <strong>₹{shipping.toFixed(2)}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between bg-transparent fs-5 border-top border-dark mt-2 pt-3">
                                    <span>Total (INR)</span>
                                    <strong>₹{total.toFixed(2)}</strong>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
