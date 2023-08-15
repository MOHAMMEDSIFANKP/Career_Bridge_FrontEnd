import {Menu,MenuHandler,MenuList,MenuItem,Button,} from "@material-tailwind/react";
export function ProfileList() {
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
      <MenuList className="rounded-xl">
        <MenuItem className="mt-4">Menu Item 1</MenuItem>
        <MenuItem className="mt-4">Menu Item 2</MenuItem>
        <MenuItem className="my-4">Menu Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
}