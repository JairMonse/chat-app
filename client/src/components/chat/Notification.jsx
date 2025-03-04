import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationsAsRead,
    markNotificationsAsRead,
  } = useContext(ChatContext);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  console.log("un", unreadNotificationsFunc);
  console.log("mn", modifiedNotifications);

  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="currentColor"
          className="bi bi-chat-left-dots"
          viewBox="0 0 16 16"
        >
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
        </svg>
        {unreadNotifications?.length === 0 ? null : (
          <div className="notification-count">
            <span>{unreadNotifications?.length}</span>
          </div>
        )}
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3> Notificaciones</h3>
            <div
              className="mark-as-read"
              onClick={() => markAllNotificationsAsRead(notifications)}
            >
              Marcar todo como leido
            </div>
            {modifiedNotifications?.length === 0 ? (
              <span className="notification">
                No hay ninguna notificacion ahora
              </span>
            ) : null}
            {modifiedNotifications &&
              modifiedNotifications.map((n, index) => {
                return (
                  <div
                    key={index}
                    className={
                      n.isRead ? "notification" : "notification not-read"
                    }
                    onClick={() => {
                      markNotificationsAsRead(
                        n,
                        userChats,
                        user,
                        notifications
                      );
                      setIsOpen(false);
                    }}
                  >
                
                    <span>{`${n.senderName} te envio un nuevo mensaje`}</span>
                    <span className="notification-time">
                      {moment(n.date).calendar()}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
