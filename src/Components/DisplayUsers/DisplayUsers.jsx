import React from "react";
import "./DisplayUsers.css";
import UserCard from "../UserCard/UserCard";

function DisplayUsers({ usersArr }) {
  return (
    <div className="display-users">
      {(usersArr && usersArr.length) &&
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
