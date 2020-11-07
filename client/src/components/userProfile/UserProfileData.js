import React from "react";

const UserProfileData = ({ userProfile }) => {
  return (
    <div className="data-items">
      <div className="font__p data-item">
        <p style={{ marginRight: ".4em" }} className="font__bold">
          first Name:
        </p>
        {userProfile.firstName}
      </div>

      <div className="font__p data-item">
        <p style={{ marginRight: ".4em" }} className="font__bold">
          Last Name:
        </p>{" "}
        {userProfile.lastName}
      </div>

      <div className="font__p data-item">
        <p style={{ marginRight: ".4em" }} className="font__bold">
          Username:
        </p>{" "}
        {userProfile.userName}
      </div>

      <div className="font__p data-item">
        <p style={{ marginRight: ".4em" }} className="font__bold">
          E-mail:
        </p>{" "}
        {userProfile.email}
      </div>
    </div>
  );
};

export default UserProfileData;