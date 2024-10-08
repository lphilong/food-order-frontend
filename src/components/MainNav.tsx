import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import UsernameMenu from './UsernameMenu';

const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <span className="flex items-center">
            {isAuthenticated ? (
                <>
                    <UsernameMenu />
                </>
            ) : (
                <Button
                    variant="ghost"
                    className="font-bold hover:text-orange-300 hover:bg-white text-xl text-white"
                    onClick={async () => await loginWithRedirect()}
                >
                    Log In
                </Button>
            )}
        </span>
    );
};

export default MainNav;
