export interface Item {
  id: string;
  name: string;
  description: string;
}

const BASE_URL = "http://localhost:3000/api/items";

// Fetch all items
export async function fetchItems(): Promise<Item[] | null> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      console.error("Error fetching items.");
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error occurred.");
    return null;
  }
}

// Fetch a single item by ID
export async function fetchItemById(id: string): Promise<Item | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      console.error("Item not found.");
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error occurred.");
    return null;
  }
}

// Create a new item
export async function createItem(itemData: Omit<Item, "id">): Promise<Item | null> {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      console.error("Error creating item.");
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error occurred.");
    return null;
  }
}

// Update an existing item
export async function updateItem(id: string, itemData: Partial<Omit<Item, "id">>): Promise<Item | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) {
      console.error("Error updating item.");
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error occurred.");
    return null;
  }
}

// Delete an item
export async function deleteItem(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Error deleting item.");
      return false;
    }
    return true;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown error occurred.");
    return false;
  }
}
