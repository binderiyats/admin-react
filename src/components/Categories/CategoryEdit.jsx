import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function CategoryEdit({ afterEdit, category }) {
  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current.value = category.name;
    nameRef.current.focus();
  }, []);

  const submit = () => {
    axios
      .patch("http://localhost:8000/categories/" + category.id, {
        name: nameRef.current.value,
      })
      .then((res) => {
        toast.success("Амжилттай нэмэгдлээ");
        afterEdit(res.data);
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
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          ref={nameRef}
          type="text"
          placeholder="Name of the category..."
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
