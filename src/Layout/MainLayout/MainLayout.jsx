import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <h1>Main Layout</h1>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;