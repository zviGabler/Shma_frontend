import React, { useEffect, useState, useCallback, useContext } from "react";
import "./UserCard.css";
import { AuthContext } from "../../lib/contexts/Auth/AuthContext";
import { useNavigate } from "react-router";
import { WsContext } from "../../lib/contexts/Ws/WsContext";

function UserCard({
  username,
  firstName,
  lastName,
  cardId,
  relationship = false,
  view = true,
}) {
  const [friendshipStatus, setFriendshipStatus] = useState("no");
  const [isNotWorking, setIsNotWorking] = useState(false);
  const { user, api } = useContext(AuthContext);
  const { socket, chatsHistory } = useContext(WsContext);
  const [userID, setUserID] = useState(0);
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`../user?user-name=${username}`);
    window.location.reload();
  };

  const sendFriendRequest = async () => {
    if (!cardId) return;
    socket.emit("send_friend_request", { to: cardId }, (response) => {
      if (response.status === 201) {
        setFriendshipStatus("pending");
      } else {
        setIsNotWorking(true);
        setTimeout(() => {
          setIsNotWorking(false);
        }, 10000);
      }
    });
  };

  const sendMessage = () => {
    navigate("../chat");
  };

  const changeFriendshipStatus = useCallback(async () => {
    if (cardId && userID !== 0) {
      if (cardId === userID) {
        setFriendshipStatus("It's me!");
        return;
      }

      if (relationship) {
        setFriendshipStatus(relationship);
      } else {
        setFriendshipStatus("no");
      }
    }
  }, [cardId, userID, api, relationship]);

  useEffect(() => {
    changeFriendshipStatus();
  }, [changeFriendshipStatus]);

  useEffect(() => {
    setUserID(user.id);
  }, [user]);

  return (
    <div className="user-card">
      <div>{username}</div>
      <div>
        {firstName} {lastName}
      </div>
      {friendshipStatus === "no" && (
        <button onClick={sendFriendRequest}>Send Friend Request</button>
      )}
      {friendshipStatus === "pending" && (
        <div className="pending">Friend Request Pending</div>
      )}
      {friendshipStatus === "accepted" && (
        <button onClick={sendMessage}>Send Message</button>
      )}
      {isNotWorking && (
        <div className="error-request-test">Error sending friend request.</div>
      )}
      {view && <button onClick={handleView}>View</button>}
    </div>
  );
}

export default UserCard;
