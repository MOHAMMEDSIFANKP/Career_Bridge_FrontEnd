import React from "react";
import {ReactSearchAutocomplete} from "react-search-autocomplete";

function NavBarSearching() {
  const items = [
    {
      id: 0,
      name: "Apple",
    },
    {
      id: 1,
      name: "Banana",
    },
    {
      id: 2,
      name: "Cherry",
    },
    {
      id: 3,
      name: "Date",
    },
    {
      id: 4,
      name: "Elderberry",
    },
    {
      id: 5,
      name: "Fig",
    },
    {
      id: 6,
      name: "Grape",
    },
    // Add more items
  ];
  // Define a function to handle item selection
  const handleOnSelect = (item) => {
    console.log(item);
    // You can perform any action when an item is selected
  };

  return (
    <div >
      <ReactSearchAutocomplete
        items={items}
        onSelect={handleOnSelect}
        fuseOptions={{ keys: ["name"] }}
      />
    </div>
  );
}

export default NavBarSearching;
