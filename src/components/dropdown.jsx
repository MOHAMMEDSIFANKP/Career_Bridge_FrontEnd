import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
 
export function MenuCustomAnimation() {
  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
    >
      <MenuHandler>
        <Button className="text-purple-400 ">fsds</Button>
      </MenuHandler>
      <MenuList className="z-50 border-purple-200 rounded-xl">
        <MenuItem className="mt-4">Menu Item 1</MenuItem>
        <hr className="border-purple-400"/>
        <MenuItem className="mt-4">Menu Item 2</MenuItem>
        <MenuItem className="my-4">Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
}