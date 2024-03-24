
import { Suspense } from "react";
import { Link, defer, useLoaderData, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";


export async function loader({ request }) {
    await requireAuth(request)
    return defer({ hostVans: getHostVans() });
}

export default function HostVans() {

    const dataPromised = useLoaderData();

    function renderHostVans(vans) {

        const hostVansEls = vans.map((van) => {

            return (
                <Link
                    to={van.id}
                    key={van.id}
                >
                    <div key={van.id}>
                        <img src={van.imageUrl} alt={`${van.name}`} />
                        <div className="host-van-info">
                            <h3>{van.name}</h3>
                            <p>${van.price}/day</p>
                        </div>
                    </div>
                </Link>
            )
        })
        return (
            <div>
                <section>
                    {hostVansEls}
                </section>
            </div>
        );
    }

    return (
        <section>
            <h1>Your Listed Vans</h1>
            <Suspense fallback={<h2>Loading Data...</h2>} >
                <Await resolve={dataPromised.hostVans}>
                    {renderHostVans}
                </Await>
            </Suspense>
        </section >
    )
}