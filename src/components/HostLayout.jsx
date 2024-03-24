import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {

    const activeStyle = {
        color: "#161616",
        fontWeight: "bold",
        textDecoration: "underline"
    }

    return (
        <>
            <nav className="host-nav">
                <NavLink
                    to='.'
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}

                >
                    Dashboard
                </NavLink>
                <NavLink
                    to='reviews'
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    reviews
                </NavLink>
                <NavLink
                    to='income'
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    income
                </NavLink>
                <NavLink
                    to='vans'
                    style={({ isActive }) => isActive ? activeStyle : null}
                >
                    Vans
                </NavLink>
            </nav>
            <Outlet />
        </>
    )
}

