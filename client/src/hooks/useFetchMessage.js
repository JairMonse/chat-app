import { useContext, useEffect, useState } from "react";
import { ChatContext } from "/src/context/ChatContext.jsx";
import { baseUrl, getRequest } from "/src/utils/services.js";

export const useFetchLatestMessage = (chat) => {
  const { newMessage, notifications } = useContext(ChatContext);
  const [latestMessage, setLatestMessage] = useState(null); // Asegúrate de usar corchetes

  useEffect(() => {
    const getMessages = async () => {
      const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

      if (response.error) {
        return console.log("Error al obtener mensajes...", response.error);
      }
      const lastMessage = response[response.length - 1];
      setLatestMessage(lastMessage);
    };
    getMessages();
  }, [chat, newMessage, notifications]);

  return { latestMessage };
};
