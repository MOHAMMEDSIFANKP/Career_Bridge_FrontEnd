import React, { useState } from "react";
import biginer from '../../../assets/biginer.png';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { NavbarDefault } from "../../../components/NavBar";
function Step_1() {
    const [selectedDiv, setSelectedDiv] = useState(-1);
    return (
        <div className="h-screen">
            <div className="h-20">
                <NavbarDefault />
            </div>
            <div className="ps-6 lg:mt-20 lg:ps-80 md:mt-20">
                <p className="text-sm ">1/3</p>
                <h4 className="text-2xl lg:pt-12 pt-5 md:text-4xl font-serif font-bold">
                    A few quick questions: first, have you <br /> freelanced before?
                </h4>
                <p className="text-sm lg:pt-4 pt-3 md:text-base">
                    This lets us know how much help to give you along the way. We won’t share your answer with anyone <br /> else, including potential clients.
                </p>
            </div>

            <div>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-4 md:mx-8 lg:mx-64 mt-8">
                    <div
                        className={`rounded-xl border relative m-2 ${selectedDiv === 0 ? "bg-purple-300" : ""
                            }`}
                        onClick={() => setSelectedDiv(0)}
                    >
                        <input
                            type="radio"
                            className="absolute top-0 right-0 mt-2 mr-2 md:mt-3 md:mr-3"
                        />
                        <div className="flex-auto">
                            <img src={biginer} className="h-40 m-5 sm:h-40" alt="" />
                            <p className="text-2xl font-serif font-bold ms-8 mb-2">
                                I am brand new to this
                            </p>
                        </div>
                    </div>

                    <div
                        className={`rounded-xl border relative m-2 ${selectedDiv === 1 ? "bg-purple-300" : ""
                            }`}
                        onClick={() => setSelectedDiv(1)}
                    >
                        <input
                            type="radio"
                            className="absolute top-0 right-0 mt-2 mr-2 md:mt-3 md:mr-3"
                        />
                        <div className="flex-auto">
                            <img src={biginer} className="h-40 m-5 sm:h-40" alt="" />
                            <p className="text-2xl font-serif font-bold ms-8 mb-2">
                                I am brand new to this
                            </p>
                        </div>
                    </div>

                    <div
                        className={`rounded-xl border relative m-2 ${selectedDiv === 2 ? "bg-purple-300" : ""
                            }`}
                        onClick={() => setSelectedDiv(2)}
                    >
                        <input
                            type="radio"
                            className="absolute top-0 right-0 mt-2 mr-2 md:mt-3 md:mr-3"
                        />
                        <div className="flex-auto">
                            <img src={biginer} className="h-40 m-5 sm:h-40" alt="" />
                            <p className="text-2xl font-serif font-bold ms-8 mb-2">
                                I am brand new to this
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-80 flex">
                <div className="flex items-end justify-start flex-1 m-4">
                    <button className="bg-transparent hover:bg-purple-500 text-purple-500 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded-full ">Back</button>
                </div>
                <div className="flex items-end justify-end flex-1 m-4">
                <button className="px-4 py-2 text-purple-500 me-4">Skip for now</button>
                <button className="bg- hover:bg-purple-500 text-purple-500 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded-full ">next </button>

                </div>
            </div>

        </div>



    )
}
export default Step_1