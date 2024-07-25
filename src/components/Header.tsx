import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import MainNav from './MainNav';

const Header = () => {
    return (
        <div className="border-b-2 border-b-orange-500 py-6 bg-orange-500">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="font-bold hover:text-orange-500 hover:bg-white text-xl text-white"
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
