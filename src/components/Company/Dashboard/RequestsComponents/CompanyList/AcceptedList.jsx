import React from 'react'

function AcceptedList() {
  return (
    <>
    <div className="border-t mt-3">
      <div className="mx-3 py-5 mt-5 border rounded-xl grid grid-cols-[14rem,1fr,18rem]">
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
            <div>
                <button className='bg-green-500 rounded-xl py-2 px-3 text-white font-bold me-3'>Messsage</button>
            </div>
         <div>
         <button className="bg-red-400 px-5 py-2 rounded-xl text-white font-bold">
            Not Scheduled
          </button>
         </div>
        </div>
      </div>
      <div className="mx-3 py-5 mt-5 border rounded-xl grid grid-cols-[14rem,1fr,18rem]">
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
          <div className='font-bold capitalize'>
          <p>Scheduled at</p>
          <p>19/12/20023</p>
          </div>
          <button className="ms-4 me-6 bg-gray-500 px-5 py-2 rounded-xl text-white font-bold">
            Change
          </button>
        </div>
      </div>
    </div>
  </>
  )
}

export default AcceptedList