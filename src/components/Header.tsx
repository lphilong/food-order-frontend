import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import MainNav from './MainNav';

const Header = () => {
    return (
        <div className=" py-6  z-50 ">
            <div className=" container mx-auto flex justify-between">
                <Link
                    to="/"
                    className="font-bold hover:text-orange-500 hover:bg-white text-xl text-black"
                >
                    Demo Web
                </Link>
                <div className="md:hidden">
                    <MobileNav />
                </div>
                <div className="hidden md:block">
                    <MainNav />
                </div>
            </div>
        </div>
    );
};

export default Header;
