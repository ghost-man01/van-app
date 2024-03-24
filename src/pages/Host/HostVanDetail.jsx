import React, { Suspense } from "react"
import { NavLink, Link, Outlet, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"


export async function loader({ params, request }) {

    await requireAuth(request)
    return defer({ van: getHostVans(params.id) });
}

export default function HostVanDetail() {


    const activeClass = {

        fontWeight: "bold",
        color: "#161616",
        textDecoration: "underline",

    }

    const dataPromised = useLoaderData();

    function renderHostVanDetails(currentVan) {

        return (
            <>
                <Link to='..'
                    relative="path"
                    className="back-button"
                >&larr; <span>Back to all vans</span></Link>
                <div key={currentVan.id}>
                    <img src={currentVan.imageUrl} alt="photoVan" />
                    <h3>{currentVan.name}</h3>
                    <p>${currentVan.price}/day</p>
                </div>
                <nav className="host-nav">

                    <NavLink
                        to="."
                        end
                        className="vanDetails"
                        style={({ isActive }) => isActive ? activeClass : null}
                    >Details</NavLink>
                    <NavLink
                        to="photo"
                        className="vanDetails"
                        style={({ isActive }) => isActive ? activeClass : null}
                    >Photos</NavLink>
                    <NavLink
                        to="pricing"
                        className="vanDetails"
                        style={({ isActive }) => isActive ? activeClass : null}
                    >Pricing</NavLink>
                </nav>
                <Outlet context={{ currentVan }} />
            </>
        );
    }


    return (
        <section>
            <React.Suspense fallback={<h2>Loading Host Vans Details...</h2>}>
                <Await resolve={dataPromised.van}>
                    {renderHostVanDetails}
                </Await>
            </React.Suspense>

        </section>
    )
}