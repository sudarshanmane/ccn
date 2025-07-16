import { NotificationBell } from "@/components/atoms/notification/NotificationBell.jsx";
import { DashboardNotifications } from "@/components/molecules/notifications/DashboardNotification.jsx";
import { useAuth } from "@/hooks/context/userAuth.js";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const Navbar = () => {
  const { auth } = useAuth();
  return (
    <div className="flex w-full justify-end p-3 gap-3 items-center bg-gray-200 ">
      <NotificationBell></NotificationBell>
      {/* <DashboardNotifications></DashboardNotifications> */}
      <Avatar className="w-10 h-10 rounded-full bg-gray-500 flex justify-center items-center">
        <AvatarImage src="https://github.com" alt="@sudarshan" />
        <AvatarFallback className="flex justify-center items-center text-white">
          {auth?.user?.username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Navbar;
