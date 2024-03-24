import { useState } from "react";
import { NavLink, Link } from "react-router-dom";


const Header = () => {

    const loggedin = () => {
        let data = localStorage.getItem('loggedIn')
        return data
    }

    const [logged, setLogged] = useState(loggedin())

    const activeStyle = {

        fontWeight: "bold",
        textDecoration: "underlined",
        color: "#161616"
    }


    const clearLocalStorage = () => {

        localStorage.removeItem('loggedIn');

    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink
                    to='host'
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    Host
                </NavLink>
                <NavLink
                    to="about"
                    style={({ isActive }) => isActive ? activeStyle : null}

                >
                    About
                </NavLink>
                <NavLink
                    to="vans"
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    Vans
                </NavLink>

                <NavLink
                    to="login"
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    Login
                </NavLink>

                {
                    logged ? <button onClick={clearLocalStorage}>Logout</button> : null
                }

            </nav>
        </header>
    );
}

export default Header;