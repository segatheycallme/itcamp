import Modal from "../Modal.js"
import { Item } from "./item-types.js";
import { deleteItem, fetchItems, updateItem } from "../api/items-api";

interface Props {
  isOpen: boolean,
  setModalOpen: (state: boolean) => void;
  item: Item | null;
  action: 'update' | 'delete' | 'create'
}

async function handleUpdate(id: string, name: string, desc: string) {
  const updateSuccessful = await updateItem(id, { name, description: desc });
}
async function handleDelete(id: string) {
  const deleteSuccessful = await deleteItem(id)
}

function ItemsModal({ isOpen, setModalOpen, item, action }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);

          switch (action) {
            case "update":

              break;
            case "create":
              break;
            case "delete":
              break;
          }
        }}>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            className="ring-1 ring-black"
            defaultValue={item?.name}
            readOnly={action === "delete"}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <br />
          <input
            type="text"
            id="description"
            name="description"
            className="ring-1 ring-black"
            defaultValue={item?.description}
            readOnly={action === "delete"}
          />
          <br />
          <button type="submit" className="float-right">OK</button>
        </form>
      </Modal>
    </>
  )
}
export default ItemsModal
