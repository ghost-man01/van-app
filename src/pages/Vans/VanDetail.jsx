import { Suspense } from "react";
import { Link, useLoaderData, useLocation, Await, defer } from "react-router-dom";
import { getVans } from "../../api";
import HostVanPhotos from "../Host/HostVanPhotos";

export function loader({ params }) {

    return defer({ vans: getVans(params.id) });

}

const VanDetail = () => {


    const location = useLocation();

    const dataPromised = useLoaderData();

    const search = location.state?.search || "";
    const vanType = location.state?.vanType || "all";

    function renderVanDetail(van) {
        return (
            <>
                <Link
                    to={`..?${search}`}
                    relative="path"
                >Back to {vanType} Vans</Link>
                <div className="van-detail">
                    <img src={van.imageUrl} alt="vanImage" />
                    <i className={`van-type ${van.type}`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this Van</button>
                </div>
            </>
        );

    }


    return (

        <div className="van-detail-container">
            <Suspense fallback={<h2>Loading Van Details...</h2>}>

                <Await resolve={dataPromised.vans}>
                    {renderVanDetail}
                </Await>

            </Suspense>
        </div >

    );
}

export default VanDetail;