import React from "react";

import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductsMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlices";
import Paginate from "../../components/Paginate";

import { toast } from "react-toastify";

const Productlistscreen = () => {
  const { pageNumber } = useParams();
  const { data, error, isLoading, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProducts, { isLoading: loadingcreate }] =
    useCreateProductsMutation();

  const [deleteProduct, { isLoading: loadingdelete }] =
    useDeleteProductMutation();

  // const TotalProducts = () => {
  //   let count = 0;
  //   if (data.products) {
  //     data.products.map(() => (count = count + 1));
  //   }
  //   return count;
  // };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createproductHandler = async () => {
    if (window.confirm("Are you sure you want to create a product?")) {
      try {
        await createProducts();
        toast.success("Product created successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-end">
          <Button className="my-3" onClick={createproductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingcreate && <Loader />}
      {loadingdelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}

      {/* <p>No of Products = <strong>{data.products.length} </strong></p> */}
    </>
  );
};

export default Productlistscreen;
