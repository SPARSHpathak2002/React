import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddToCart } from "./app/CartActions";
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"


const App = () => {
  const dispatch = useDispatch();
  const [product, Setproduct] = useState([]);
  const checkId = useSelector((state) => state.CartItems)
  const FetchDetails = async () => {
    const url = 'https://api.imgflip.com/get_memes'
    const { data } = await Axios.get(url);
    const memes = data.data.memes;
    const Items = memes.map((meme) => ({
      id: meme.id,
      pname: meme.name,
      price: Math.floor(Math.random() * 100),
      image: meme.url
    }))
    Setproduct(Items)
  }
  useEffect(() => {
    FetchDetails()
  }, [])

  const atc = (id) => {
    const index = product.findIndex(i => i.id === id)
    if (CheckRepeat(id)) {
      toast("Already Added to Cart", { type: "error" })
    }
    else {
      toast("Successfully Added to Cart", { type: "success" })
      dispatch(AddToCart(product[index]))
      console.log(product[index].price)
    }
  }

  const CheckRepeat = (id) => {
    const ele = checkId.find(i => i.id === id)
    if (ele) {
      return true
    }
    else {
      return false
    }

  }
  return (
    <Container >
      <br /><h4>Here are some Exiting memes you can buy</h4><hr />
      <Row>
        {product.map(item => (
          <Col className="setpad" key={item.id}>
            <Card style={{ width: '18rem' }} key={item.id}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.pname}</Card.Title>
                <Card.Text>
                  {item.price} $
                </Card.Text>
                <Button variant="primary" onClick={() => { atc(item.id) }}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer />
    </Container>
  )
}
export default App