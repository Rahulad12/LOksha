import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assest/styles/product.css";
import Rating from "./Rating";
const product = ({ product }) => {
  return (
    <Container >
      <Card className="my-3 py-3 rounded">
        <Link to={`/products/${product._id}`}>
          <Card.Img src={product.img} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/products/${product._id}`} className="product-title">
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating value={product.rating} text={product.numReviews} />
          </Card.Text>
          <Card.Text as="h3" className="product-price">
            Rs.{product.price}
          </Card.Text>
          {/* <Card.Text as="p" className="product-description">
          {product.description}
        </Card.Text> */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default product;
