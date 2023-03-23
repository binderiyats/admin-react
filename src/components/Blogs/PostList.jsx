import axios from "axios";
import { useState } from "react";
import { SlPencil, SlTrash } from "react-icons/sl";
import { toast } from "react-toastify";

const ListItem = ({ item, index }) => {
  const [deleted, setDeleted] = useState(false);

  const deleteItem = () => {
    axios
      .delete("http://localhost:8000/articles/" + item.id)
      .then(() => {
        toast.success("Амжилттай устгалаа");
        setDeleted(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Алдаа гарлаа");
      });
  };
  if (deleted) return <></>;
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <img src={item.imageUrl} style={{ maxWidth: "100%" }} alt="" />
      </td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td style={{ whiteSpace: "nowrap" }}>
        <button className="btn btn-sm btn-outline-primary me-2">
          <SlPencil />
        </button>
        <button className="btn btn-sm btn-outline-danger">
          <SlTrash />
        </button>
      </td>
    </tr>
  );
};

export default function PostList({ items, onEdit }) {
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th width="1">#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th width="1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <ListItem
            item={item}
            index={index + 1}
            key={`list-item-${index}`}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}
