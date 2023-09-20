import React from "react";

function AllDetails() {
  return (
    <>
      <div className="border-t mt-3">
        <div className="hover:bg-gray-200 cursor-pointer mx-3 py-5 mt-5 border rounded-xl grid grid-cols-[14rem,1fr,14rem]">
          <div className="flex justify-center items-center">
            <img
              src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.webp?b=1&s=170667a&w=0&k=20&c=ahypUC_KTc95VOsBkzLFZiCQ0VJwewfrSV43BOrLETM="
              alt=""
              className="w-28 rounded-full"
            />
          </div>
          <div className="text-gray-800">
            <p className="font-bold text-xl">Mohammed sifan kp</p>
            <p className="font-bold">Full stack python devoloper</p>
            <p>skills : python node </p>
          </div>
          <div className="flex justify-center items-center">
          <button className="bg-green-500 px-5 py-2 rounded-xl text-white font-bold">Accept</button>
            <button className="ms-3 bg-red-400 px-5 py-2 rounded-xl text-white font-bold">Reject</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllDetails;
