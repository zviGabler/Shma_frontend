import React, { useCallback, useEffect, useState } from "react";
import { API_URL, endpoints } from "../../constants/settings";
import "./UserInfo.css";
import UserCard from "../UserCard/UserCard";
import DisplayUsers from "../DisplayUsers/DisplayUsers";

function UserInfo() {
  const [infoUserName, setInfoUserName] = useState("");
  const [infoFirstName, setInfoFirstName] = useState("");
  const [infoLastName, setInfoLastName] = useState("");
  const [infoID, setInfoID] = useState();
  const [friendsIds, setFriendsIds] = useState([]);

  const setDetails = useCallback(async () => {
    if (infoUserName && infoUserName.length) {
      try {
        const response = await fetch(
          `${API_URL}${endpoints.users}${endpoints.userDetails}?userName=${infoUserName}`
        );

        const jsonResponse = await response.json();

        if (response.status === 200) {
          const { firstName, lastName, id } = jsonResponse.data[0];
          setInfoFirstName(firstName);
          setInfoLastName(lastName);
          setInfoID(id);
        } else {
          console.log(jsonResponse.message);
        }
      } catch {
        console.log("User details not yet available");
      }
    }
  }, [infoUserName]);

  const setArrayOfFriends = useCallback(async () => {
    const response = await fetch(
      `${API_URL}${endpoints.friendships}${endpoints.friends}/${infoID}`
    );
    if (response.status === 200) {
      const jsonResponse = await response.json();
      setFriendsIds(jsonResponse.data);
    }
  }, [infoID]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pageUserName = searchParams.get("user-name");
    setInfoUserName(pageUserName);
  }, []);

  useEffect(() => {
    setDetails();
    setArrayOfFriends();
  }, [setDetails, setArrayOfFriends]);

  return (
    <div className="user-info-page">
      <div className="user-info">
        <UserCard
          username={infoUserName}
          firstName={infoFirstName}
          lastName={infoLastName}
          cardId={infoID}
        />
      </div>
      <div className="users-friends">
        <div className="friends-title">
          {infoFirstName} {infoLastName}'s Friends
        </div>
        {friendsIds && friendsIds.length ? (
          <DisplayUsers idsArr={friendsIds} />
        ) : (
          <div className="no-friends">No friends to display</div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
