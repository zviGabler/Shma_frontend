import React, { useEffect, useState, useCallback } from "react";
import './UserCard.css';

function UserCard({ username, firstName, lastName, cardId }) {
  const [friendshipStatus, setFriendshipStatus] = useState("accepted");

  const sendFriendRequest = () => {
    // send friend request through server
    setFriendshipStatus("pending");
  };

  const sendMessage = () => {
    // redirect to send message to this person
    console.log("Send Message");
  };

  const changeFriendshipStatus = useCallback(async () => {
    console.log("set friendship status");
    console.log(cardId);
    // check frienships table for friendship
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
      {friendshipStatus==="no" && <button onClick={sendFriendRequest}>Send Friend Request</button>}
      {friendshipStatus==="pending" && <div className="pending">Friend Request Pending</div>}
      {friendshipStatus==="accepted" && <button onClick={sendMessage}>Send Message</button>}
    </div>
  );
}

export default UserCard;
