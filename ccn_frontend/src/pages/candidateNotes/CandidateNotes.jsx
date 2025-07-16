import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/context/userAuth.js";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

const CandidateNotes = () => {
  const { auth } = useAuth();
  const { id: candidateId } = useParams();

  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", candidateId);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [candidateId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/notes/${candidateId}`,
        { headers: { "x-access-token": auth?.token } }
      );
      setMessages(res?.data?.data?.docs || []);
    };

    const fetchUsers = async () => {
      const res = await axios.get(`http://localhost:3000/api/v1/users`, {
        headers: { "x-access-token": auth?.token },
      });
      setAllUsers(res?.data?.data?.docs || []);
    };

    fetchMessages();
    fetchUsers();
  }, [candidateId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setContent(value);

    const cursorIndex = e.target.selectionStart;
    const sliced = value.slice(0, cursorIndex);
    const match = sliced.match(/@([^\s@]*)$/);

    if (match) {
      const query = match[1];
      console.log(query);

      const filtered = allUsers.filter((u) => u?.username?.includes(query));
      setSuggestions(filtered);

      console.log("Suggestions:", allUsers, filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleUserSelect = (user) => {
    const cursorIndex = inputRef.current.selectionStart;
    const textBefore = content.slice(0, cursorIndex);
    const textAfter = content.slice(cursorIndex);
    const match = textBefore.match(/@([^\s@]*)$/);
    const atIndex = match ? textBefore.lastIndexOf("@") : cursorIndex;

    const newContent =
      textBefore.slice(0, atIndex) + `@~${user.username} ` + textAfter;

    setContent(newContent);
    setTaggedUsers((prev) =>
      prev.some((u) => u._id === user._id) ? prev : [...prev, user]
    );

    setSuggestions([]);
  };

  const sendMessage = async () => {
    const contentWithoutTags = content.replace(/@~?\w+\s*/g, "").trim();
    const newMessage = {
      content: contentWithoutTags,
      candidateId,
      authorId: auth?.user?._id,
      taggedUsers: taggedUsers.map((u) => u._id),
    };

    const res = await axios.post(
      `http://localhost:3000/api/v1/notes`,
      newMessage,
      { headers: { "x-access-token": auth?.token } }
    );

    socket.emit("sendMessage", res.data.data);
    setContent("");
    setTaggedUsers([]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Candidate Notes</h2>

      <div className="border rounded-md h-80 overflow-y-auto p-4 bg-white">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 text-sm text-gray-800">
            <span className="font-semibold text-blue-600">
              {msg.author?.name || "User"}:
            </span>{" "}
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-col gap-2 relative">
        <Input
          ref={inputRef}
          placeholder="Write a message... use @ to tag"
          value={content}
          onChange={handleInputChange}
        />

        {suggestions.length > 0 && (
          <div className="absolute z-10 bg-white shadow-lg border rounded-md w-full max-h-40 overflow-y-auto top-12">
            {suggestions.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {user.username}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateNotes;
