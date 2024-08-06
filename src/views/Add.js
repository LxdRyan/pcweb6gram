import { useEffect, useState } from "react";
import { Button, Container, Form, Image, Row } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Menubar from "../templates/Menubar";

const Add = () => {
  const [user, loading] = useAuthState(auth);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const addPost = async () => {
    const imageRef = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(response.ref);
    await addDoc(collection(db, "posts"), { caption, image: imageUrl });
    navigate("/");
  };

  const ShowPreview = () => {
    if (preview) {
      return (
        <Image
          src={preview}
          style={{ objectFit: "cover", width: "12rem", height: "12rem" }}
        />
      );
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      return navigate("/login");
    }
  }, [loading, navigate, user]);

  return (
    <>
      <Menubar />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
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
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(image) => {
                const imageFile = image.target.files[0];
                const previewUrl = URL.createObjectURL(imageFile);
                setPreview(previewUrl);
                setImage(imageFile);
              }}
            />
          </Form.Group>
          <Row className="mb-3">
            <ShowPreview />
          </Row>
          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Add;
