/* eslint-disable react/no-unescaped-entities */
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
    return (
        <div className="text-center my-20">
            <h1 className="text-5xl font-semibold mb-5">Welcome To Task Management</h1>
            <p className="">Empower Your Productivity with Our Task Management Platform! Seamlessly organize, prioritize, and conquer your to-do list. Effortlessly collaborate with your team, track progress, and celebrate achievements. Take control of your tasks with intuitive features and a user-friendly interface. Elevate your efficiency and streamline your workflow. Sign up today for a more organized and productive tomorrow!</p>

            <button className="btn btn-outline text-white my-5 font-bold">Let's Explore <FaArrowRight></FaArrowRight></button>
        </div>
    );
};

export default Banner;