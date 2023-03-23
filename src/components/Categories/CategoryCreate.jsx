import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function CategoryCreate({ afterSubmit }) {
  const nameRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const submit = () => {
    axios
      .post("http://localhost:8000/categories", {
        name: nameRef.current.value,
        description: descRef.current.value,
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
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name of the category..."
          ref={nameRef}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as={"textarea"} ref={descRef} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
