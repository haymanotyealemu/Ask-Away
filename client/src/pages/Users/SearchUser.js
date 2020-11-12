import React, { useState } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/users.actions/getUsers";
import { searchByUsername } from "../../actions/users.actions/searchByUsername";

const SearchUser = ({getUsers, searchByUsername}) => {
  let [searchedUsername, setSearchedUsername] = useState("");

  const onChange = (e) => setSearchedUsername(e.target.value);

  const searchForUser = () => {
    if (searchedUsername !== "" || searchedUsername !== null){
      return searchByUsername(searchedUsername);
    }
    else getUsers(); 
  };
  return (
    <header className="users-header">
      <p className="app_color_font font__bold font__p users-headline">Users</p>
      <br />

      <form className="search-user-wrapper" style={{ 'border-radius': '25px'}}>
        <textarea style={{ 'border-radius': '25px', 'backgroundColor':"#FFFFFF  "}}
          type="submit"
          onChange={(e) => onChange(e)}
          value={searchedUsername}
        />

        <div
          className="user-search-button app_color_background font__p font__bold"style={{ 'border-radius': '25px'}}
          onClick={() => searchForUser()}
        >
          Search for user
        </div>
      </form>
    </header>
  );
};

export default connect(null, { searchByUsername, getUsers})(SearchUser);
