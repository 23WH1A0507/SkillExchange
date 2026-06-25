import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useUser } from "../../util/UserContext";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfileDropdown = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    try {
      await axios.get("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          overflow: "hidden",
          marginRight: "10px",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <img
          src={user?.picture}
          alt="User Avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <span style={{ color: "#eef2f3", fontWeight: 700 }}>{user?.username}</span>
      <span style={{ marginLeft: "8px", color: "#eef2f3" }}>▼</span>
    </div>
  ));

  const CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => (
    <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
      <ul className="list-unstyled">{React.Children.toArray(children)}</ul>
    </div>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item onClick={() => navigate(`/profile/${user.username}`)}>Profile</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Header = () => {
  const [navUser, setNavUser] = useState(null);
  const { user } = useUser();
  const [discover, setDiscover] = useState(false);

  useEffect(() => {
    setNavUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [user]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setDiscover(currentPath.includes("discover"));
  }, [window.location.pathname]);

  return (
    <Navbar
      key="md"
      expand="md"
      className="bg-body-tertiary"
      style={{ backgroundColor: "#0f2f2a", borderBottom: "1px solid rgba(255,255,255,0.1)", zIndex: 998 }}
    >
      <Container fluid>
        <Navbar.Brand
          href="/"
          style={{ fontFamily: "Josefin Sans, sans-serif", color: "#fbf1a4", fontWeight: 700, letterSpacing: "0.08em" }}
        >
          SKILL SWAP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-md`}
              style={{ fontFamily: "Josefin Sans, sans-serif", color: "#3bb4a1" }}
            >
              SKILL SWAP
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" style={{ fontFamily: "Montserrat, sans-serif", color: "#eef2f3", marginRight: "0.8rem" }}>
                Home
              </Nav.Link>
              {navUser ? (
                <>
                  <Nav.Link as={Link} to="/discover" style={{ fontFamily: "Montserrat, sans-serif", color: "#eef2f3", marginRight: "0.8rem" }}>
                    Discover
                  </Nav.Link>
                  <Nav.Link as={Link} to="/chats" style={{ fontFamily: "Montserrat, sans-serif", color: "#eef2f3", marginRight: "0.8rem" }}>
                    Chats
                  </Nav.Link>
                  {discover && (
                    <>
                      <Nav.Link href="#for-you" style={{ fontFamily: "Montserrat, sans-serif", color: "#f56664" }} className="d-md-none">
                        For You
                      </Nav.Link>
                      <Nav.Link href="#popular" style={{ fontFamily: "Montserrat, sans-serif", color: "#3bb4a1" }} className="d-md-none">
                        Popular
                      </Nav.Link>
                      <Nav.Link href="#web-development" style={{ fontFamily: "Montserrat, sans-serif", color: "#eef2f3" }} className="d-md-none">
                        Web Dev
                      </Nav.Link>
                      <Nav.Link href="#machine-learning" style={{ fontFamily: "Montserrat, sans-serif", color: "#eef2f3" }} className="d-md-none">
                        ML
                      </Nav.Link>
                      <Nav.Link href="#others" style={{ fontFamily: "Montserrat, sans-serif", color: "#eef2f3" }} className="d-md-none">
                        Others
                      </Nav.Link>
                    </>
                  )}
                  <Nav.Link as={Dropdown} style={{ fontFamily: "Montserrat, sans-serif", color: "#eef2f3" }}>
                    <UserProfileDropdown />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" style={{ fontFamily: "Montserrat, sans-serif", color: "#eef2f3", marginRight: "0.8rem" }}>
                    Login/Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
