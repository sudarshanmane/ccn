import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

export const NotificationBell = () => {
  const { unreadCount } = useNotifications();

  return (
    <div className="relative">
      <Bell className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
};
