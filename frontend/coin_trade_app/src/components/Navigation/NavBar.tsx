import { Link } from "@tanstack/react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

/**
 * Responsive navigation bar for the Coin Trader web app.
 * Includes branding and links to core routes (Home, About).
 * Built with React Bootstrap and TanStack Router.
 */
function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" className="w-100" expand="md">
            <Container>
                {/* Branding logo/title */}
                <Navbar.Brand as={Link} to="/">
                    Coin Trader
                </Navbar.Brand>

                {/* Navigation links */}
                <Nav className="me-auto d-flex gap-3">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/about" className="nav-link">
                        About
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;
