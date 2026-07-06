import Notification from "../models/Notification.js";

export async function createNotification({
  receiver,
  sender = null,
  title,
  message,
  type = "system",
  priority = "medium",
  ticket = null,
  device = null,
}) {
  return await Notification.create({
    receiver,
    sender,
    title,
    message,
    type,
    priority,
    ticket,
    device,
  });
}