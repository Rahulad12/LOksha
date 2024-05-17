// import { useEffect,useState } from 'react';
import React from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Product from "../components/product.js";
// import productlist from "../productlist.json";
// import axios from "axios";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import "../assest/styles/homescreen.css";
import Paginate from "../components/Paginate.js";
import Productcarasoule from "../components/Productcarasoule.js";
import { useGetProductsQuery } from "../slices/productsApiSlices.js";

const Homescreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  //   const [products,setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () =>{
  //     const {data} = await axios.get('/api/products');
  //     setProducts(data);
  //   };
  //   fetchProducts();

  // },[]);

  return (
    <>
      {!keyword ? (
        <Productcarasoule />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.messsage || error.error}
        </Message>
      ) : (
        <>
        
          <h1 className="screen-title">Our Products</h1>
          <Row>
            {data.products.map((products) => {
              return (
                <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={products} />
                </Col>
              );
            })}
          </Row>

          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Homescreen;
