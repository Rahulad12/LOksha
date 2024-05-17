import React from 'react'
import {Container,Row,Col} from "react-bootstrap";
import "../assest/styles/footer.css";

const Footer = () => {
    const currentyear = new Date().getFullYear()
  return (
    <footer className='footer'>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    <p> LOKsha &copy; {currentyear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
