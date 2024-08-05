import { useEffect, useState } from "react";
import { Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    setPosts([]);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">FosSnS</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
};

const ImageSquare = ({ post }) => {
  const { image, id } = post;
  return (
    <Link
      to={`post/${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}
    >
      <Image
        src={image}
        style={{
          objectFit: "cover",
          width: "18rem",
          height: "18rem",
        }}
      />
    </Link>
  );
};

export default Home;
