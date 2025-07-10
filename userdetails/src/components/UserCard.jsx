function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded-md shadow w-full max-w-sm bg-white">
      <img src={user.image} alt={user.name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-xl font-bold mt-2">{user.name}</h2>
      <p className="text-gray-600 mb-2">{user.email}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(user)}
          className="px-4 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserCard;
