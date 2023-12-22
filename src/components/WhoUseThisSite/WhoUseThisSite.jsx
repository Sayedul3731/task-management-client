import developersImg from "../../assets/developer.jpg"
import corporateImg from "../../assets/corporateProfessionals.jpg"
import bankersImg from "../../assets/bankers.jpg"

const WhoUseThisSite = () => {
    return (
        <div className="my-10">
            <h1 className="text-4xl font-bold text-center">Who Can Use This Site?</h1>
            <p className="text-justify md:text-center px-2 my-5">
                Welcome to our advanced task management platform, crafted for developers, corporate professionals, and bankers alike. Tailored to meet your unique needs, it seamlessly enhances productivity, collaboration, and project control. Experience the future of efficient task management, designed specifically for your professional success.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                <div className="card bg-base-100 shadow-xl text-black">
                    <figure><img src={corporateImg} className="h-[250px] w-full" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Corporate Professionals</h2>
                        <p className="text-justify">Unleash the power of organized task management in the corporate world. Boost teamwork, track projects effortlessly, and meet milestones with ease. Our platform empowers professionals to excel in their roles, ensuring a seamless and efficient work environment.</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl text-black">
                    <figure><img src={developersImg} className="h-[250px] w-full" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Developers</h2>
                        <p className="text-justify">Elevate your productivity with our task management platform designed exclusively for developers. Streamline your coding projects, collaborate seamlessly, and stay in control of deadlines. Maximize efficiency with features tailored to your coding workflow.</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl text-black">
                    <figure><img src={bankersImg} className="h-[250px] w-full" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Bankers</h2>
                        <p className="text-justify">Navigate the financial landscape with precision using our task management site. It enhances project coordination, facilitates secure, and ensures compliance. Stay ahead in the fast-paced financial industry by managing tasks efficiently and meeting critical deadlines.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoUseThisSite;