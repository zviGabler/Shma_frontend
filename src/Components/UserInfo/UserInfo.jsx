import React, { useCallback, useContext, useEffect, useState } from "react";
import "./UserInfo.css";
import UserCard from "../UserCard/UserCard";
import DisplayUsers from "../DisplayUsers/DisplayUsers";
import { AuthContext } from "../../lib/contexts/Auth/AuthContext";

function UserInfo() {
  const [infoUserName, setInfoUserName] = useState("");
  const [infoFirstName, setInfoFirstName] = useState("");
  const [infoLastName, setInfoLastName] = useState("");
  const [infoID, setInfoID] = useState();
  const [friendsIds, setFriendsIds] = useState([]);
  const { api } = useContext(AuthContext);

  const setDetails = useCallback(async () => {
    if (infoUserName && infoUserName.length) {
      try {

        const response = await api.getUserByUserName(infoUserName);

        if (response.status === 200) {
          const { firstName, lastName, id } = response.data.data;
          setInfoFirstName(firstName);
          setInfoLastName(lastName);
          setInfoID(id);
        } else {
          console.log(response.data.message);
        }
      } catch {
        console.log("User details not yet available");
      }
    }
  }, [infoUserName, api]);

  const setArrayOfFriends = useCallback(async () => {
    if (infoID) {
      const response = await api.getFriendsIds(infoID);
      if (response.status === 200) {
        setFriendsIds(response.data.data);
      }
    }
  }, [infoID, api]);

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
        {infoID && (
          <UserCard
            username={infoUserName}
            firstName={infoFirstName}
            lastName={infoLastName}
            cardId={infoID}
            view={false}
          />
        )}
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
