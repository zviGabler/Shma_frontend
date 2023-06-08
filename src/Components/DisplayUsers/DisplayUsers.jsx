import React, { useCallback, useEffect, useState } from "react";
import "./DisplayUsers.css";
import UserCard from "../UserCard/UserCard";
import { API_URL, endpoints } from "../../constants/settings";

function DisplayUsers({ idsArr }) {
  const [usersArr, setUsersArr] = useState([]);

  const updateUsersArr = useCallback(async () => {
    if (idsArr && idsArr.length) {
      try {
        const response = await fetch(
          `${API_URL}${endpoints.users}${endpoints.usersByIds}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ids: idsArr,
            }),
          }
        );
        const jsonResponse = await response.json();
        if (response.status === 200) {
          setUsersArr(jsonResponse.data);
        } else {
          console.log(jsonResponse.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [idsArr]);

  useEffect(() => {
    updateUsersArr();
  }, [updateUsersArr]);

  return (
    <div className="display-users">
      {usersArr &&
        usersArr.length &&
        usersArr.map((user) => {
          const { userName, firstName, lastName, id } = user;
          return (
            <UserCard
              userName={userName}
              firstName={firstName}
              lastName={lastName}
              cardId={id}
              key={Number(id)}
            />
          );
        })}
    </div>
  );
}

export default DisplayUsers;
