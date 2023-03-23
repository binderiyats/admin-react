import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function PostCreate({ afterSubmit }) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const submit = () => {
    axios
      .post("http://localhost:8000/articles", {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
      })
      .then((res) => {
        toast.success("Амжилттай нэмэгдлээ");
        afterSubmit(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Алдаа гарлаа");
      });
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Form.Group className="mb-3" controlId="form.name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name of the post..."
          ref={nameRef}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} ref={descriptionRef} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
