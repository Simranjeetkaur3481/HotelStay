import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import {
  useDeleteNotificationMutation,
  useGetNotificationCountQuery,
  useGetNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from "@/store/api/notificationApi";
import { Badge, Bell, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const Notification = () => {
  const { user } = useAuth();
  const { data: notifData } = useGetNotificationCountQuery(undefined, { skip: !user });
  console.log(notifData)
  const { data: notificationsData } = useGetNotificationsQuery(undefined, { skip: !user });
  const [readNotification] = useReadNotificationMutation();
  const [readAllNotifications] = useReadAllNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const unreadCount =
    (typeof notifData?.data === "number"
      ? notifData.data
      : (notifData?.data?.unreadCount ?? notifData?.unreadCount ?? 0)) || 0;

  const notificationsPayload = notificationsData?.data ?? notificationsData ?? [];

  const notifications = Array.isArray(notificationsPayload)
    ? notificationsPayload
    : Array.isArray(notificationsPayload?.items)
      ? notificationsPayload.items
      : Array.isArray(notificationsPayload?.notifications)
        ? notificationsPayload.notifications
        : Array.isArray(notificationsPayload?.data)
          ? notificationsPayload.data
          : [];

  const onRead = async (id: number) => {
    try {
      await readNotification(id).unwrap();
    } catch {
      toast.error("Failed to mark notification as read");
    }
  };

  const onReadAll = async () => {
    try {
      await readAllNotifications(undefined).unwrap();
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to update notifications");
    }
  };

  const onDelete = async (id: number) => {
    try {
      await deleteNotification(id).unwrap();
      toast.success("Notification removed");
    } catch {
      toast.error("Failed to delete notification");
    }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative rounded-xl">
            <Bell className="size-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full p-0 text-[10px]">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-96">
          <div className="flex items-center justify-between px-2 py-1">
            <DropdownMenuLabel className="p-0">ALl Notifications</DropdownMenuLabel>
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={onReadAll}>
                Mark all read
              </Button>
            )}
          </div>
          <DropdownMenuSeparator />
          {notifications.length === 0 ? (
            <div className="px-2 py-6 text-center text-sm text-muted-foreground">No new notifications</div>
          ) : (
            notifications.slice(0, 8).map((notification: any) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex items-start gap-2"
                onSelect={(e) => e.preventDefault()}
              >
                <button className="flex-1 text-left" onClick={() => onRead(notification.id)}>
                  <p className={`text-sm ${notification.isRead ? "text-muted-foreground" : "font-medium"}`}>
                    {notification.title ?? "Notification"}
                  </p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {notification.message ?? "You have an update."}
                  </p>
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete(notification.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notification;
