import React, { useCallback, useEffect, useState } from "react";
import { API_URL, endpoints } from "../../constants/settings";
import "./UserInfo.css";
import UserCard from "../UserCard/UserCard";
import DisplayUsers from "../DisplayUsers/DisplayUsers";

function UserInfo() {
  const [infoUserName, setInfoUserName] = useState("");
  const [infoFirstName, setInfoFirstName] = useState("");
  const [infoLastName, setInfoLastName] = useState("");
  const [infoID, setInfoID] = useState(0);
  const [friendsArr, setFriendsArr] = useState([]);

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
    
    const dummyArr = [{id: 2, userName: 'Last', firstName: 'userNameNew0', lastName: 'First'},{id: 3, userName: 'userNameNew0', firstName: 'First', lastName: 'Last'},{id: 4, userName: 'userNameNew1', firstName: 'First', lastName: 'Last'},{id: 5, userName: 'Last', firstName: 'userNameNew0', lastName: 'First'},{id: 6, userName: 'userNameNew0', firstName: 'First', lastName: 'Last'},{id: 7, userName: 'userNameNew1', firstName: 'First', lastName: 'Last'},{id: 8, userName: 'Last', firstName: 'userNameNew0', lastName: 'First'},{id: 9, userName: 'userNameNew0', firstName: 'First', lastName: 'Last'},{id: 10, userName: 'userNameNew1', firstName: 'First', lastName: 'Last'}];


    //make call to database and get IDs. Once have ID's return array of all users with those IDS.
    setFriendsArr(dummyArr)
    console.log(infoID);
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
        <DisplayUsers usersArr={friendsArr} />
      </div>
    </div>
  );
}

export default UserInfo;