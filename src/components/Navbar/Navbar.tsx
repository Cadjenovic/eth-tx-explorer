import { HashLink } from "react-router-hash-link";
import "./Navbar.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='nav-left'>
                <HashLink smooth to='#explore' className='nav-link'>
                    Explore
                </HashLink>
                <HashLink smooth to='#trace' className='nav-link'>
                    Trace
                </HashLink>
                <HashLink smooth to='#gas' className='nav-link'>
                    Gas
                </HashLink>
            </div>
            <div className='nav-right'>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
