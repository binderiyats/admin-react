import { useEffect } from "react";
import { useState } from "react";
import Heading from "../components/Heading";
import MenuPositionList from "../components/Menu/Positions/PositionList";
import axios from "axios";
import DynamicModal from "../components/utils/DynamicModal";
import MenuPositionCreate from "../components/Menu/Positions/PositionCreate";

export default function MenuPositions() {
  const [positions, setPositions] = useState([]);
  const [menus, setMenus] = useState([]);
  const [modalContent, setModalContent] = useState(<></>);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/menu-positions").then((res) => {
      setPositions(res.data);
    });
  }, []);

  const handleClose = () => setModalShow(false);

  const modalClose = () => {
    setModalContent(<></>);
    setModalShow(false);
  };

  const afterSubmit = (menu) => {
    modalClose();
    setMenus([...menus, menu]);
  };

  const showCreateModal = () => {
    setModalContent(<MenuPositionCreate afterSubmit={afterSubmit} />);
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
    setModalContent(
      <MenuPositionCreate category={menu} afterEdit={afterEdit} />
    );
    setModalShow(true);
  };

  return (
    <>
      <div className="container-sm body-container">
        <Heading title="Menu positions" handleShow={showCreateModal} />
        <MenuPositionList items={positions} onEdit={showEditModal} />
      </div>
      <DynamicModal
        show={modalShow}
        handleClose={handleClose}
        title="Create position "
        content={modalContent}
      />
    </>
  );
}
