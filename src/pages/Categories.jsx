import { useContext, useEffect, useState } from "react";
import CategoryList from "../components/Categories/CategoryList";
import Heading from "../components/Heading";
import { toast } from "react-toastify";
import CategoryCreate from "../components/Categories/CategoryCreate";
import CategoryEdit from "../components/Categories/CategoryEdit";
import axios from "axios";
// import useQuery from '../hooks/useQuery';
import { useLocation, useSearchParams } from "react-router-dom";
import { ModalContext } from "../contexts/ModalContext";

export default function Categories() {
  const { setModalContent, setModalShow, setModalTitle, modalClose } =
    useContext(ModalContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Алдаа гарлаа");
      });
  }, []);

  const afterSubmit = (category) => {
    modalClose();
    setCategories([...categories, category]);
  };

  const showCreateModal = () => {
    setModalTitle("Category nemeh");
    setModalContent(<CategoryCreate afterSubmit={afterSubmit} />);
    setModalShow(true);
  };

  const afterEdit = (category) => {
    modalClose();
    let newCategories = categories.map((cat) => {
      if (cat.id === category.id) {
        return category;
      }
      return cat;
    });
    setCategories(newCategories);
  };

  const showEditModal = (category) => {
    setModalContent(<CategoryEdit category={category} afterEdit={afterEdit} />);
    setModalShow(true);
  };

  return (
    <>
      <div className="container-sm body-container">
        <Heading title="Categories" handleShow={showCreateModal} />
        <CategoryList items={categories} onEdit={showEditModal} />
      </div>
    </>
  );
}
