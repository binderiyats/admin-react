import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryEdit from "../components/Categories/CategoryEdit";
import Heading from "../components/Heading";
import MenuList from "../components/Menu/MenuList";
import DynamicModal from "../components/utils/DynamicModal";
import MenuCreate from "../components/Menu/MenuCreate";

export default function Menus() {
  const [position, setPosition] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [menus, setMenus] = useState([]);
  const [modalContent, setModalContent] = useState(<></>);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/menu-positions/` + id).then((res) => {
      setPosition(res.data);
    });

    axios
      .get(`http://localhost:8000/menus?positionId=` + id)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Алдаа гарлаа!");
      });
  }, []);

  const modalClose = () => {
    setModalContent(<></>);
    setModalShow(false);
  };

  const afterSubmit = (menu) => {
    modalClose();
    setMenus([...menus, menu]);
  };

  const showCreateModal = () => {
    setModalContent(<MenuCreate afterSubmit={afterSubmit} positionId={id} />);
    setModalShow(true);
  };

  const afterEdit = (category) => {
    modalClose();
    let newMenus = menus.map((cat) => {
      if (cat.id === category.id) {
        return category;
      }
      return cat;
    });
    setMenus(newMenus);
  };

  const showEditModal = (menu) => {
    setModalContent(<CategoryEdit category={menu} afterEdit={afterEdit} />);
  };

  return (
    <>
      <div className="container-sm body-container">
        <Heading
          title={`"${position?.name}" - Menus`}
          handleShow={showCreateModal}
        />
        <MenuList items={menus} onEdit={showEditModal} />
      </div>
      <DynamicModal
        content={modalContent}
        show={modalShow}
        handleClose={modalClose}
        title="Edit Menu"
      />
    </>
  );
}
