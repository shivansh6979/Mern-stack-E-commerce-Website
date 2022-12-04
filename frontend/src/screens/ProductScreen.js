import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

const ProductScreen = () => {
  const { id } = useParams();
  console.log("idddd", id);

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data[0]);
    };
    fetchProduct();
  }, [id]);
  console.log("lkfkfkda", product);
  const { image, name, description, price, numReviews, countInStock, rating } =
    product;

  console.log("Imageeee", image);
  console.log("nameeee", name);

  return (
    <div>
      <Link className="btn btn-light my-3" to={"/"}>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={rating} reviews={`${numReviews}`} />
            </ListGroupItem>
            <ListGroupItem>Price : $ {price}</ListGroupItem>
            <ListGroupItem>Description : {description}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>$ {price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status :</Col>
                  <Col>{countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block "
                  disabled={countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
