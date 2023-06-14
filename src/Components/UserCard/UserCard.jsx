import React, { useEffect, useState, useCallback } from "react";
import "./UserCard.css";
import { API_URL, endpoints } from "../../constants/settings";
import { getToken } from "../../lib/contexts/Auth/utils";

function UserCard({ username, firstName, lastName, cardId }) {
  const [friendshipStatus, setFriendshipStatus] = useState("no");
  const [isNotWorking, setIsNotWorking] = useState(false);

  const userID = getToken();

  const sendFriendRequest = async () => {
    if (cardId) {
      const response = await fetch(
        `${API_URL}${endpoints.friendships}${endpoints.request}/${userID}/${cardId}`,
        { method: "POST" }
      );
      if (response.status === 200) {
        setFriendshipStatus("pending");
      } else {
        setIsNotWorking(true);
        setTimeout(() => {
          setIsNotWorking(false);
        }, 10000);
      }
    }
  };

  const sendMessage = () => {
    // redirect to send message to this person
    console.log("Send Message");
  };

  const changeFriendshipStatus = useCallback(async () => {
    const response = await fetch(`${API_URL}${endpoints.friendships}${endpoints.checkFriendship}/${userID}/${cardId}`);
    if (response.status === 200) {
      const jsonResponse = await response.json();
      const friendshipDetails = jsonResponse.data;
      if (friendshipDetails) {
        setFriendshipStatus(friendshipDetails.status);
      } else {
        setFriendshipStatus("no");
      }
    }
  }, [cardId]);

  useEffect(() => {
    changeFriendshipStatus();
  }, [changeFriendshipStatus]);

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
    </div>
  );
}

export default UserCard;
