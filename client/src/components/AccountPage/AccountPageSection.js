import React from "react";
import SingleAccountData from "./SingleAccountData";

const AccountPageSection = ({ firstName, lastName, userName, email }) => {
  return (
    <div className="data-items">
      <SingleAccountData dataName="First Name:" dataToShow={firstName} />

      <SingleAccountData dataName="Last Name:" dataToShow={lastName} />

      <SingleAccountData dataName="Username:" dataToShow={userName} />

      <SingleAccountData dataName="E-mail:" dataToShow={email} />
    </div>
  );
};

export default AccountPageSection;