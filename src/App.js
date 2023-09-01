import React, { useEffect, useState } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import { nanoid } from "nanoid";
import "@chatui/core/dist/index.css";

export default function App() {
  const { messages, appendMsg, setTyping, updateMsg } = useMessages([]);
  const [msgID, setMsgID] = useState("");
  const [result, setResult] = useState("我是");

  useEffect(() => {
    // 监听result的改变，来实现打字机效果
    updateMsg(msgID, {
      type: "text",
      content: { text: result }
    });
  }, [result]);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      // 先设置一个唯一的msgID
      const msgID = nanoid();
      setMsgID(msgID);

      appendMsg({
        type: "text",
        content: { text: val },
        position: "right"
      });

      setTyping(true);

      // 初始化创建一条空信息
      appendMsg({
        _id: msgID,
        type: "text",
        content: { text: result }
      });

      // 这里模仿请求数据
      setTimeout(() => {
        setResult("我是咱们屯里的人");
      }, 1000);
    }
  }

  function renderMessageContent(msg) {
    const { content } = msg;
    return <Bubble content={content.text} />;
  }

  return (
    <Chat
      navbar={{ title: "智能助理" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
}
