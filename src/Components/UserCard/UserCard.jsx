import React, { useEffect, useState, useCallback, useContext } from "react";
import "./UserCard.css";
import { AuthContext } from "../../lib/contexts/Auth/AuthContext";
import { useNavigate } from "react-router";

function UserCard({ username, firstName, lastName, cardId, view=true }) {
  const [friendshipStatus, setFriendshipStatus] = useState("no");
  const [isNotWorking, setIsNotWorking] = useState(false);
  const { user } = useContext(AuthContext);
  const [userID, setUserID] = useState(0);
  const { api } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`../user?user-name=${username}`);
    window.location.reload();
  }

  const sendFriendRequest = async () => {
    if (cardId) {

      const response = await api.friendRequest(userID, cardId);
      
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
    if (cardId && userID !== 0) {
      if (cardId === userID) {
        setFriendshipStatus("It's me!")
        return
      }

      const response = await api.checkFriendship(userID, cardId);

      if (response.status === 200) {
        const friendshipDetails = response.data.data;
        if (friendshipDetails) {
          setFriendshipStatus(friendshipDetails.status);
        } else {
          setFriendshipStatus("no");
        }
      }
    }
  }, [cardId, userID, api]);

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
      {(view && friendshipStatus!=="It's me!") && 
      <button onClick={handleView}>View</button>}
    </div>
  );
}

export default UserCard;
