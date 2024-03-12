import { Link } from "react-router-dom";
const Nav = () => {

    return (
        <div className="navigation">
            <h3>#VANLIFE</h3>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
            </nav>
        </div>
    );

}

export default Nav;