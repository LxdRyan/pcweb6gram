import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Menubar from "../templates/Menubar";

const Update = () => {
  const [user, loading] = useAuthState(auth);
  const params = useParams();
  const { id } = params;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const updatePost = async () => {
    await updateDoc(doc(db, "posts", id), { caption, image });
    navigate(`/post/${id}`);
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
    <div>
      <Menubar />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Update Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://zca.sg/img/1"
              value={image}
              onChange={(text) => setImage(text.target.value)}
            />
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={(e) => updatePost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Update;
