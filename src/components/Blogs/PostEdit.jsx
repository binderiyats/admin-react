import axios from "axios";
import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function PostEdit({ afterEdit, article }) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageUrlRef = useRef(null);

  useEffect(() => {
    nameRef.current.value = article.name;
    descriptionRef.current.value = article.description;
    imageUrlRef.current.value = article.imageUrl;
    nameRef.current.focus();
  }, []);

  const submit = () => {
    axios
      .patch("http:localhost:8000/articles/" + article.id, {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        imageUrl: imageUrlRef.current.value,
      })
      .then((res) => {
        toast.success("Амжилттай нэмэгдлээ");
      });
  };
  return (
    <Form>
      <Form.Label>Name</Form.Label>
      <Form.Control />
      <Form.Group />
      <Button>Submit</Button>
    </Form>
  );
}
