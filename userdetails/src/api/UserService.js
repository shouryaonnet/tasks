const API_URL = "https://6863fdc188359a373e9720ed.mockapi.io/api/userDetails/users";
export const getUsers = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
export const addUser = async (user) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
export const updateUser = async (id, updatedUser) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
