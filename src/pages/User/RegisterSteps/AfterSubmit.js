import { useSelector } from "react-redux";

const AfterSubmit = () =>{
  
  const Skill = useSelector((state) => state.user.Skills);
  console.log(Skill);
}
export {AfterSubmit}