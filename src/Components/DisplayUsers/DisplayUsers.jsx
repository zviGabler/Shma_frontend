import React, { useCallback, useContext, useEffect, useState } from "react";
import "./DisplayUsers.css";
import UserCard from "../UserCard/UserCard";
import { AuthContext } from "../../lib/contexts/Auth/AuthContext";

function DisplayUsers({ idsArr }) {
  const [usersArr, setUsersArr] = useState([]);
  const { api } = useContext(AuthContext);

  const updateUsersArr = useCallback(async () => {
    if (idsArr && idsArr.length) {
      try {
        const response = await api.usersFromIds(idsArr);

        if (response.status === 200) {
          setUsersArr(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [idsArr, api]);

  useEffect(() => {
    updateUsersArr();
  }, [updateUsersArr]);

  return (
    <div className="display-users">
      {(usersArr &&
        usersArr.length) ?
        usersArr.map((user) => {
          const { userName, firstName, lastName, id } = user;
          return (
            <UserCard
              username={userName}
              firstName={firstName}
              lastName={lastName}
              cardId={id}
              key={Number(id)}
            />
          );
        }): ""}
    </div>
  );
}

export default DisplayUsers;
