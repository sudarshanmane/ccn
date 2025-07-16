// hooks/useNotifications.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/context/userAuth";

export const useNotifications = () => {
  const { auth } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/notifications", {
      headers: { "x-access-token": auth?.token },
    });
    setNotifications(res.data.data);
    setUnreadCount(res.data.data.filter((n) => !n.isRead).length);
  };

  const markAsRead = async (id) => {
    await axios.patch(
      `http://localhost:3000/api/v1/notifications/${id}/read`,
      null,
      {
        headers: { "x-access-token": auth?.token },
      }
    );
    fetchNotifications();
  };

  useEffect(() => {
    if (auth?.token) fetchNotifications();
  }, [auth]);

  return { notifications, unreadCount, markAsRead };
};
