import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RemoveFromCart } from "../app/CartActions"
import { FaShoppingCart } from 'react-icons/fa'
import { Card, Button,Col, Offcanvas } from 'react-bootstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css"
//onClick={()=>{dispatch(RemoveFromCart(item.id))}}
const Cart = ({ ...props }) => {
  const items = useSelector((state) => state.CartItems)
  const qty=useSelector(state=>state.Quantity)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalPrice = useSelector((state) =>
  state.CartItems.reduce((sum, item) => sum + item.price, 0)
);
const onBuy=(id)=>{
  dispatch(RemoveFromCart(id))
  toast("Successfully Bought",{type:"success"})
}
  return (
    <>
      <Button variant="dark" onClick={handleShow} className="me-2">
        My Cart <FaShoppingCart />
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><h4>My Cart <FaShoppingCart /></h4></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <Card className="buyAll">
            <Card.Body>
              <Card.Text>
               <p style={{fontSize:'20px'}}>Total Quantity :  {qty}</p> 
                <p style={{fontSize:'20px'}} >Total price :  {totalPrice} $</p>
              </Card.Text>
              <Button variant="success" size="md" style={{width:'100%'}}>Buy All</Button>
            </Card.Body>
          </Card>

          {items.map(item => (
            <Col className="setpad" key={item.id}>
              <Card style={{ width: '18rem' }} key={item.id}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.pname}</Card.Title>
                  <Card.Text>
                    {item.price} $
                  </Card.Text>
                  <Button variant="outline-danger" style={{width:'40%',marginRight:'4px'}} onClick={() => { dispatch(RemoveFromCart(item.id)) }}>Cancel</Button>
                  <Button variant="outline-success" style={{width:'40%',marginLeft:'4px'}} onClick={()=>{onBuy(item.id)}}>Buy</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
export default Cart

