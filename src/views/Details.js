import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import Menubar from "../templates/Menubar";

const Details = () => {
  const [user, loading] = useAuthState(auth);
  const params = useParams();
  const { id } = params;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    navigate("/");
  };

  const getPost = async (id) => {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/login");
    }
    getPost(id);
  }, [id, loading, navigate, user]);

  return (
    <>
      <Menubar />
      <Container>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>{caption}</Card.Text>
                <Card.Link href={`/update/${id}`}>Edit</Card.Link>
                <Card.Link
                  onClick={() => deletePost(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Details;
