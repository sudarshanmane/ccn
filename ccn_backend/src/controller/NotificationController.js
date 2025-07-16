import Notifications from "../schema/notificationSchema.js";

export const createNotifications = async ({
  taggedUsers,
  content,
  candidateId,
  noteId,
}) => {
  const notifications = taggedUsers.map((userId) => ({
    userId,
    message: content,
    candidateId,
    noteId,
  }));

  await Notifications.insertMany(notifications);
};

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.find({ userId: req.user.id })
      .populate("candidateId", "name")
      .populate("noteId", "content")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: notifications });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching notifications", error });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    await Notifications.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update status" });
  }
};
