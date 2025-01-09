import { useEffect, useState } from "react";
import { Item } from "./item-types";
import { deleteItem, fetchItems, updateItem } from "../api/items-api";
import ItemsModal from "./items-modal";

function ItemsTable() {
  const [items, setItems] = useState<Item[]>([]);
  const [currItem, setCurrItem] = useState<Item | null>(null);
  const [openn, setOpenn] = useState<boolean>(false);
  const [action, setAction] = useState<"update" | "create" | "delete">("update");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const fetchedItems = await fetchItems();
    if (fetchedItems) {
      setItems(fetchedItems);
    } else {
      setError("Failed to fetch items.");
    }
  }

  return (
    <div className="overflow-x-auto">
      <ItemsModal isOpen={openn} setModalOpen={setOpenn} item={currItem} action={action} />
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase border-b border-gray-200">
              ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase border-b border-gray-200">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase border-b border-gray-200">
              Description
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase border-b border-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{item.id}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{item.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">{item.description}</td>
              <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-200">
                <button onClick={() => { setOpenn(true); setCurrItem(item); setAction("update") }} className="p-1 bg-green-400 m-2 rounded-md">Update</button>
                <button onClick={() => { setOpenn(true); setCurrItem(item); setAction("delete") }} className="p-1 bg-red-400 m-2 rounded-md">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        {
          error &&
          <div className=" text-lg text-red-500 text-center">
            {error}
          </div>
        }
      </table>
    </div>
  );
};

export default ItemsTable;
