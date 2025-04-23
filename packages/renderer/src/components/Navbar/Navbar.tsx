import './Navbar.scss';
import {useLocation, useNavigate} from "react-router-dom";

export default function Navbar() {
    const {pathname} = useLocation();

    return (
        <div className="navbar__container">
            <div className="navbar__items">
                <NavbarItem title="Home" path="/" highlight={pathname === '/'}/>
                <NavbarItem title="Browse" path="/browse" highlight={pathname.startsWith('/browse')}/>
                <NavbarItem title="Search" path="/search/artworks" highlight={pathname.startsWith('/search')}/>
                <NavbarItem title="Add" path="/add" highlight={pathname.startsWith('/add')}/>
            </div>
        </div>
    );
}

function NavbarItem({title, path, highlight}: NavbarItemProps) {
    const navigate = useNavigate();
    const handleClick = () => navigate(path);
    return (
        <button className={`navbar__item${highlight ? " active" : ""}`} onClick={handleClick}>{title}</button>
    );
}

type NavbarItemProps = {
    title: string;
    path: string;
    highlight: boolean;
};