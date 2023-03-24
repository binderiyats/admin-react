import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PostCreate from "../components/Blogs/PostCreate";
import PostList from "../components/Blogs/PostList";
import Heading from "../components/Heading";
import DynamicModal from "../components/utils/DynamicModal";
import { ModalContext } from "../contexts/ModalContext";
import PostEdit from "../components/Blogs/PostEdit";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const { setModalContent, setModalShow, setModalTitle, modalClose } =
    useContext(ModalContext);

  useEffect(() => {
    axios
      .get("http://localhost:8000/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Алдаа гарлаа");
      });
  }, []);

  const afterSubmit = (article) => {
    modalClose();
    setArticles([...articles, article]);
  };

  const showCreateModal = () => {
    setModalTitle("Add article");
    setModalContent(<PostCreate afterSubmit={afterSubmit} />);
    setModalShow(true);
  };

  const afterEdit = (article) => {
    modalClose();
    let newArticles = articles.map((art) => {
      if (art.id === article.id) {
        return article;
      }
      return art;
    });
    setArticles(newArticles);
  };

  const showEditModal = () => {
    setModalContent(<PostEdit />);
  };
  return (
    <>
      <div className="container-sm body-container">
        <Heading title="Blog posts" />
        <PostList items={articles} />
      </div>
    </>
  );
}
