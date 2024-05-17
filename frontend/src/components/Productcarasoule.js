import React from "react";
import { Link } from "react-router-dom";
import { Carousel,  Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlices";

const Productcarasoule = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error} </Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {data.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/products/${product._id}`} className="carasoulelink">
            <Image
              src={product.img}
              alt={product.name}
              fluid
              className="carasouleimage"
            />

            <Carousel.Caption className="carousel-caption">
              <h2 className="my-4">
                {product.name} (Rs.{product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Productcarasoule;
