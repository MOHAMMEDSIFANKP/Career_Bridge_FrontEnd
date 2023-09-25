import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  CompanyPostBolckUnblock,
  CompanyPostDetails,
  GetListOfCompanyPost,
} from "../../../../../services/companyApi";
import { CleartPosts, setPosts } from "../../../../../Redux/CompanySlice";
const Unblock = ({
  isOpen,
  view,
  onClose,
  resetView,
  updateSearcheddata,
  Selectedpost,
}) => {
  const dispatch = useDispatch();
  const { CompanyInfo } = useSelector((state) => state.company);
  const ConfirmButton = async () => {
    try {
      const data = {
        is_blocked: "false",
        is_deleted: "false",
      };
      const res = await CompanyPostBolckUnblock(data, Selectedpost.id);

      if (res.status === 200) {
        resetView();
        const res2 = await GetListOfCompanyPost(CompanyInfo.companyid);
        updateSearcheddata(res2.data);
        dispatch(CleartPosts());
        res2.data.map((post, index) => {
          dispatch(setPosts(post));
        });
        const res3 = await CompanyPostDetails(Selectedpost.id);
        toast.success("Post Deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
    onClose();
  };
  return (
    <>
      <Dialog open={isOpen} handler={onClose} size={"xs"}>
        <DialogHeader>Block Post</DialogHeader>
        <DialogBody>
          <p>
            Are you sure you want to block '
            <span className="font-bold">
              {Selectedpost?.Jobtitle.title_name}
            </span>
            ' from your profile?
          </p>{" "}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={onClose}
            className="mr-1 text-gray-700"
          >
            <span>Cancel</span>
          </Button>
          <button
            variant="gradient"
            className="rounded-full bg-purple-400 text-white font-bold px-2 py-1"
            onClick={ConfirmButton}
          >
            <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export { Unblock };
