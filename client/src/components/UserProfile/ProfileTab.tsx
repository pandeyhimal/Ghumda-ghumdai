import { useContent } from "@/contexts/ContentContext";

export default function ProfileTab() {
  const { currentUser } = useContent();

  return (
    <div className="flex flex-col items-center text-center space-y-4">
      <img
        src={currentUser?.avatar || "/default-avatar.png"}
        alt="User Avatar"
        className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
      />
      <h2 className="text-2xl font-bold text-gray-800">{currentUser?.fullName}</h2>
      <p className="text-gray-500">{currentUser?.email}</p>
      <div className="flex space-x-4 mt-2">
        <p className="text-gray-700 font-medium">Role: {currentUser?.role}</p>
        <p className="text-gray-700 font-medium">Joined: {new Date(currentUser?.createdAt || "").toLocaleDateString()}</p>
      </div>
    </div>
  );
}
