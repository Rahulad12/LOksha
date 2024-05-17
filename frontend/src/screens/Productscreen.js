import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Meta from "../components/Meta.js";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Container,
  Form,

} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

import "../assest/styles/productscreen.css"; //custom css
import { addToCart } from "../slices/cartSlice.js";
import {
  useGetProductsDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlices";

// import axios from "axios";
// import { useEffect, useState } from "react";

// const Productscreen = () => {
//   const[product,setProducts] = useState([]);
//   const { id: productId } = useParams();
// useEffect(() => {
//   const fetchProducts = async () =>{
//     const {data} = await axios.get(`/api/products/${productId}`);
//     setProducts(data);
//   };
//   fetchProducts();

// },[productId]);

const Productscreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: products,
    isLoading,
    refetch,
    error,
  } = useGetProductsDetailsQuery(productId);

  const [createReview, { isLoading: loadingproductreview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...products, qty }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap() ;
      refetch();
      toast.success("Review Submitted Successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);

    }
  }
  return (
    <>
      <Container className="product-container">
        <Link to="/" className="btn btn-light my-5 ">
          Back
        </Link>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.messsage || error.error}
          </Message>
        ) : (
          <>
          <Meta title={products.name} />
            <Row className="product-row">
              <Col md={5}>
                <Image
                  src={products.img}
                  className="product-image"
                  alt={products.alt}
                  fluid
                />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{products.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={products.rating}
                      text={products.numReviews}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Price:</b> Rs.{products.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Description:</b> {products.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>Rs.{products.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {products.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {products.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as={"select"}
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(products.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={
                          products.countInStock === null ||
                          products.countInStock === 0
                        }
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>

            <Row className="review "> 
              <Col md={6}>
                <h2 className="my-3 ">Reviews</h2>

                {products.reviews.length === 0 && <Message>No Reviews</Message>}

                <ListGroup variant="flush">
                  {products.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0,10)} </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    {loadingproductreview && <Loader />}
                    <h2>Write a Customer Review</h2>
                    {userInfo ? (

                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>

                    
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button disabled={loadingproductreview} type="submit" variant="primary">Submit</Button>
                      </Form>
                    ):(
                      <Message>Please <Link to="/login">Sign in</Link> to write a review</Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Productscreen;
