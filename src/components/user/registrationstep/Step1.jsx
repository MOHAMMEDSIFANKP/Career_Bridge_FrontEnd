import React, { useState ,useEffect} from "react";
import biginer from '../../../assets/biginer.png';
import someexpert from '../../../assets/someexpert.png';
import expert from '../../../assets/expert.png';
function Step_1() {
    useEffect(() => {
        document.title = 'Add your Position';
      }, []);
    
    const [selectedDiv, setSelectedDiv] = useState(-1);
    return (
        <div className="sm:pt-5 z-10">
            <div className="ps-6 lg:mt-20 lg:ps-80 md:mt-20 mt-14">
                <p className="text-sm ">1/3</p>
                <h4 className="text-2xl lg:pt-12 pt-5 md:text-4xl font-serif font-bold">
                    A few quick questions: first, have you <br /> freelanced before?
                </h4>
                <p className="text-sm lg:pt-4 pt-3 md:text-base">
                    This lets us know how much help to give you along the way. We won’t share your answer with anyone <br /> else, including potential clients.
                </p>
            </div>

            <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-4 md:mx-8 lg:mx-72 mt-8 pb-20">
                    <div
                        className={`rounded-xl border relative m-2 ${selectedDiv === 0 ? "bg-purple-300 border-gray-400" : ""
                            }`}
                        onClick={() => setSelectedDiv(0)}
                    >
                       
                        <div className="flex-auto mb-5">
                            <img src={biginer} className="h-40 m-5 sm:h-40" alt="" />
                            <p className="text-2xl font-serif font-bold ms-8 mb-2">
                                I am new to this
                            </p>
                        </div>
                    </div>

                    <div
                        className={`rounded-xl border relative m-2 ${selectedDiv === 1 ? "bg-purple-300 border-gray-400" : ""
                            }`}
                        onClick={() => setSelectedDiv(1)}
                    >
                       
                        <div className="flex-auto mb-5">
                            <img src={someexpert} className="h-40 m-5 sm:h-40" alt="" />
                            <p className="text-2xl font-serif font-bold ms-8 mb-2">
                                Some experience
                            </p>
                        </div>
                    </div>

                    <div
                        className={`rounded-xl border relative m-2 ${selectedDiv === 2 ? "bg-purple-300 border-gray-400" : ""
                            }`}
                        onClick={() => setSelectedDiv(2)}
                    >
                       
                        <div className="flex-auto mb-5">
                            <img src={expert} className="h-40 m-5 sm:h-40" alt="" />
                            <p className="text-2xl font-serif font-bold ms-8 mb-2 ">
                                I am an expert
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
                <div className="bg-white h-20 w-full shadow-xl border flex justify-between">
                    <div>
                    <button className="bg-transparent hover:bg-purple-500 text-purple-500 font-semibold hover:text-white py-2 px-6 m-4 border border-purple-500 hover:border-transparent rounded-full ">Back</button>
                    </div>    
                    <div className="flex">
                   <div className="w-24 me-4 flex">
                   <button className="  text-purple-500">Skip for now</button>
                   </div>
                   <div className="w-24 pt-5">
                
                    <button className="bg-purple-400 px-6 py-2 rounded-full">Next</button>
                   </div>
                    </div>
                </div> 
            </div>

        </div>



    )
}
export default Step_1
