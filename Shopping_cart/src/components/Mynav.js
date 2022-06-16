import { Navbar,Container,Nav }from 'react-bootstrap'
import Cart from "../components/cart"

const Mynav = () => {
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#home"><b>S</b>hopping <b>M</b>ART</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link style={{color:'white'}} ><Cart placement='end'/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Mynav