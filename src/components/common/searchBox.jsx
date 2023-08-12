import React from "react";
import Input from "./input";
const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      autoFocus
      name="searchQuery"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      placeholder="Search ..."
      type="text"
      className="form-control my-3"
    />
  );
};

export default SearchBox;
