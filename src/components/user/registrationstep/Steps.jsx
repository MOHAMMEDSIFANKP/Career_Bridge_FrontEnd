
import { Input, Button } from "@material-tailwind/react";
import React, { useState, useEffect } from 'react';
import biginer from '../../../assets/biginer.png';
import someexpert from '../../../assets/someexpert.png';
import expert from '../../../assets/expert.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function Steps() {

    useEffect(() => {
        document.title = 'Add your Position';
    }, []);

    // Backend message showing
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    useEffect(() => {
        if (message) {
            if (message.length === 13) {
                toast.error(message);
            } else {
                toast.success(message);
            }
        }
    }, [message]);
    // Page 1
    const [selectedDiv, setSelectedDiv] = useState(-1);

    const SelectionSubmit = () => {
        if (selectedDiv === -1) {
            toast.warn('choose an option')
        } else {
            setActiveStep(1)
        }
    }
    // page 3 modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    // For the next and previous button
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(true);

    const storedActiveStep = localStorage.getItem('activeStep');
    const initialActiveStep = parseInt(storedActiveStep) || 0;
    const [activeStep, setActiveStep] = useState(initialActiveStep);
    useEffect(() => {
        localStorage.setItem('activeStep', activeStep);
    }, [activeStep]);



    const steps = [
        // page 1
        <div>
            <div className="container  px-8 mt-10 lg:mt-32 sm:mt-14 mx-auto">
                <p className="text-sm">1/7</p>
                <div className="sm:mt-8 mt-5">
                    <h4 className="font-bold text-2xl md:text-4xl font-serif">
                        A few quick questions: first, have you <br /> freelanced before?
                    </h4>
                    <p className="text-sm lg:pt-4 pt-3 md:text-base">
                        This lets us know how much help to give you along the way. We won’t share your answer with anyone <br /> else, including potential clients.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 -mx-3">
                    <div
                        className={`rounded-xl border shadow-xl relative mt-3 mx-2 ${selectedDiv === 0 ? "bg-purple-100 border-gray-400" : ""
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
                        className={`rounded-xl border shadow-xl relative mt-3 mx-2 ${selectedDiv === 1 ? "bg-purple-100 border-gray-400" : ""
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
                        className={`rounded-xl border shadow-xl relative mt-3 mx-2 ${selectedDiv === 2 ? "bg-purple-100 border-gray-400" : ""
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
                <div className="z-20 lg:h-64 lg:mt-3 md:h-72 md:mt-2 flex items-end fixed bottom-0 left-0 right-0">
                    <div className="bg-white h-20 w-full shadow-xl border flex justify-end">
                        {/* <div>
             <button onClick={()=>navigate('/signup')} className="bg-transparent hover:bg-purple-500 text-purple-500 font-semibold hover:text-white py-2 px-6 m-4 border border-purple-500 hover:border-transparent rounded-full ">Back</button>
             </div>     */}
                        <div className="flex">
                            <div className="w-24 me-4 flex">
                                <button onClick={() => navigate('/user/')} className="  text-purple-500">Skip for now</button>
                            </div>
                            <div className="w-24 pt-5">

                                <button onClick={SelectionSubmit} className="bg-purple-400 px-6 py-2 rounded-full">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        // page 2
        <div>
            <div className="container mt-10 lg:mt-28 sm:mt-14 mx-auto">
                <p className="text-sm">2/7</p>
                <div className="sm:mt-8 mt-5">
                    <p className="font-bold text-2xl md:text-4xl font-serif">Got it. Now, add a title to tell the world <br /> what you do.</p>
                    <p className="mt-3">It’s the very first thing clients see, so make it count. Stand out by describing your <br /> expertise in your own words.</p>
                    <p className="mt-3">Your professional role</p>
                </div>
                <div className="grid grid-cols-12 gap-4 mt-5 mb-32">
                    <div className="col-span-12 sm:col-span-6 ">
                        <div className="">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="h-14 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                            />
                        </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 ">
                        <div className="flex-grow">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className="h-14 !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>,
        // Page 3
        <div>
            <div className="container mt-10 lg:mt-28 sm:mt-14 mx-auto">
                <p className="text-sm">3/7</p>
                <div className="sm:mt-8 mt-5">
                    <p className="font-bold text-2xl md:text-4xl font-serif">If you have relevant work experience, add it <br /> here.</p>
                    <p className="mt-3">Freelancers who add their experience are twice as likely to win work. But if you’re just starting out,<br /> you can still create a great profile. Just head on to the next page.</p>
                </div>
                <div className="grid grid-cols-12 gap-4 mt-5 mb-32 ">
                    <div className="sm:col-span-12 md:col-span-6 shadow-xl bg-purple-50 lg:col-span-4 border md:h-56 sm:h-40 sm:w-full w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer" >
                        <div className="rounded-full h-10 w-10 sm:bg-purple-400">
                            <p onClick={handleOpen} variant="gradient" className="text-4xl ps-2 sm:text-white text-purple-400">+</p>
                            <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                                Add experience
                            </p>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl relative">
                        <div className="absolute inset-0 flex items-center justify-center">

                        </div>
                        <div className="p-6">
                            sdfsadfsad
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl" >
                    </div>
                    <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl" >
                    </div>
                    <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl" >
                    </div>
                </div>
            </div>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody divider>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty five years to get these plants, twenty five years of
                    blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                    getting started. I&apos;m up to something. Fan luv.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>,
        // Page 4
        <div>
            <div className="container mt-10 lg:mt-28 sm:mt-14 mx-auto">
                <p className="text-sm">4/7</p>
                <div className="sm:mt-8 mt-5">
                    <p className="font-bold text-2xl md:text-4xl font-serif">Clients like to know what you know - add<br /> your education here.</p>
                    <p className="mt-3">You don’t have to have a degree. Adding any relevant education helps make your profile more visible.</p>
                </div>
                <div className="grid grid-cols-12 gap-4 mt-5 mb-32 ">
                    <div className="sm:col-span-12 md:col-span-6 shadow-xl bg-purple-50 lg:col-span-4 border md:h-56 sm:h-40 sm:w-full w-44 rounded-full sm:rounded-xl border-gray-400 flex items-center sm:ps-8 sm:bg-purple-50 cursor-pointer" >
                        <div className="rounded-full h-10 w-10 sm:bg-purple-400">
                            <p onClick={handleOpen} variant="gradient" className="text-4xl ps-2 sm:text-white text-purple-400">+</p>
                            <p className="w-40 sm:text-xl sm:font-thin font-bold text-purple-400 sm:text-gray-700 sm:mt-2 -mt-8 sm:ms-0 ms-10">
                                Add education
                            </p>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl relative">
                        <div className="absolute inset-0 flex items-center justify-center">

                        </div>
                        <div className="p-6">
                            sdfsadfsad
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl" >
                    </div>
                    <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl" >
                    </div>
                    <div className="col-span-12 md:col-span-6 shadow-xl lg:col-span-4 border md:h-56 h-40 rounded-2xl" >
                    </div>
                </div>
            </div>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody divider>
                    second modal
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>,
        // Page 5
        <div>
            <div className="container mt-10 lg:mt-28 sm:mt-14 mx-auto">
                <p className="text-sm">5/7</p>
                <div className="sm:mt-8 mt-5">
                    <p className="font-bold text-2xl md:text-4xl font-serif">Looking good. Next, tell us which languages<br />you speak.</p>
                    <p className="mt-3">Upwork is global, so clients are often interested to know what languages you speak. English is a <br />must, but do you speak any other languages?</p>
                </div>
                <div>
                    <table>
                        <th>
                            <td>fdsaf</td>
                            <td>fdsfadasd</td>
                        </th>
                       
                    </table>
                </div>
            </div>

        </div>,
        <div>
            page6
        </div>,
    ];

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handlePrev = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };
    useEffect(() => {
        setIsFirstStep(activeStep === 0);
        setIsLastStep(activeStep === steps.length - 1);
    }, [activeStep]);

    return (
        <div className="w-full py-4 px-8">
            <ToastContainer />
            <div className="">
                {steps[activeStep]}
            </div>

            <div className="lg:mt-3 md:mt-2 shadow-xl bg-white border flex justify-between fixed bottom-0 left-0 right-0">
                <div className="m-5">
                    <button className="rounded-full bg-purple-50 border border-purple-400 px-6 py-2" onClick={handlePrev} disabled={isFirstStep}>
                        Prev
                    </button >
                </div>
                <div className="m-5">
                    <button className="z-10 rounded-full bg-purple-400 px-6 py-2 " onClick={handleNext} disabled={isLastStep}>
                        Next
                    </button>
                </div>
            </div>
        </div>

    );
}

export default Steps;
