import { useNotifications } from "@/hooks/notifications/useNotifications.jsx";
import { Bell } from "lucide-react";

export const NotificationBell = () => {
  const { unreadCount } = useNotifications();

  return (
    <div className="relative hover:cursor-pointer">
      <Bell className="w-6 h-6" />
      {unreadCount && (
        <span className="absolute -top-1  bg-red-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
      {console.log(unreadCount)}
    </div>
  );
};
