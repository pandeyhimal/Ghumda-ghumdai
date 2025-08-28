import { useContent } from "@/contexts/ContentContext";

export default function NotificationsTab() {
  const { notifications } = useContent();

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications yet.</p>
      ) : (
        notifications.map((note: any) => (
          <div key={note._id} className="border rounded-lg p-3 hover:bg-gray-50 transition-all">
            <p className="text-gray-800 font-medium">{note.title}</p>
            <p className="text-gray-500 text-sm">{note.description}</p>
            <span className="text-gray-400 text-xs">{new Date(note.date).toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  );
}
