import { useNotifications } from "@/hooks/notifications/useNotifications.jsx";

export const DashboardNotifications = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="p-4 mt-3 mb-3 bg-white rounded shadow-md space-y-3">
      <h3 className="text-lg font-semibold">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">No notifications yet.</p>
      ) : (
        notifications.map((note) => (
          <div
            key={note._id}
            className={`p-2 border rounded ${
              !note.isRead ? "bg-gray-100" : ""
            }`}
          >
            <p className="text-sm">{note.message}</p>
            {!note.isRead && (
              <button
                className="text-blue-600 text-xs mt-1"
                onClick={() => markAsRead(note._id)}
              >
                Mark as read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};
