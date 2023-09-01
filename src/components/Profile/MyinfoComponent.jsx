import EditIcon from '../../assets/Edit.png'

export function MyinfoComponent() {
  return (
    <>
      <div className="w-full flex">
        <div>
          <p className="text-3xl font-bold "> My info</p>
          <p className="mt-3 mb-8">This is a client account</p>
        </div>
      </div>
      <div className="me-10 h-60 rounded-2xl border border-purple-400">
       <div className="flex justify-between">
        <div className='flex items-end ms-5 text-xl font-bold'><p>Account</p></div>
        <div><div className='w-8 h-8 rounded-full border border-purple-400 me-4 mt-4 flex justify-center items-center'><img src={EditIcon } className='w-5' alt="" /></div></div>
       </div>
        <div className='mx-5'>
            <div>
              
            </div>
        </div>
      </div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </>
  );
}
