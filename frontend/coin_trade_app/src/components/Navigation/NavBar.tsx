import { Link } from "@tanstack/react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
    return (
        <>
            <Navbar bg="dark" className="w-100 " data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Coin Trader</Navbar.Brand>
                    <Nav className="me-auto flex gap-3">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
