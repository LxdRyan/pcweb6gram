import { useEffect, useState } from "react";
import { Button, Container, Form, Image, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Menubar from "../components/Menubar";

const Update = () => {
  const [user, loading] = useAuthState(auth);
  const params = useParams();
  const { id } = params;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const updatePost = async () => {
    const imageName = image.name;
    const imageRef = ref(storage, `images/${imageName}`);
    const response = await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(response.ref);
    await updateDoc(doc(db, "posts", id), {
      caption,
      image: { name: image.name, url: imageUrl },
    });
    navigate(`/post/${id}`);
  };

  const getPost = async (id) => {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
    setPreview(post.image);
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
              type="file"
              onChange={(e) => {
                const imageFile = e.target.files[0];
                const previewUrl = URL.createObjectURL(imageFile);
                setPreview(previewUrl);
                setImage(imageFile);
              }}
            />
          </Form.Group>
          <Row className="mb-3">
            <ShowPreview />
          </Row>
          <Button variant="primary" onClick={(e) => updatePost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Update;
