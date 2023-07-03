import React from "react";

function Search({ name, value, setValue }) {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <input
      type="text"
      name={name}
      placeholder="Type here..."
      value={value[name]}
      onChange={handleInputChange}
    ></input>
  );
}

export default Search;
