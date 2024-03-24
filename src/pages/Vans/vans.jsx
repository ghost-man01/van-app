import { useEffect, useState, Suspense } from "react";
import { Await, Link, defer, useLoaderData, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";


export function loader() {

    return defer({ vans: getVans() })
}

const Vans = () => {


    const [searchParamter, setSearchParameter] = useSearchParams();
    const [error, setError] = useState(null)
    const dataPromise = useLoaderData();

    const typeFilter = searchParamter.get("type");

    const handleChangeFilter = (key, value) => {

        console.log(key, value);
        setSearchParameter(prevParams => {
            if (value === null) {
                prevParams.delete(key);
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        })
    }





    if (error) {

        return <h1>There was an error {error.message}</h1>
    }


    function renderVanElements(vansData) {
        const filterVans = typeFilter
            ? vansData.filter(van => van.type === typeFilter)
            : vansData


        const vanElements = filterVans.map((van) => {
            return (
                <div key={van.id} className="van-title" >
                    <Link to={van.id}
                        state={{ search: searchParamter.toString(), vanType: typeFilter }}
                    >
                        <img src={van.imageUrl} alt="" />
                        <div className="van-info">
                            <h3>{van.name}</h3>
                            <p>${van.price}<span>/day</span></p>
                        </div>
                        <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    </Link>
                </div >
            )
        })
        return (
            <>
                <div>
                    <button onClick={() => handleChangeFilter("type", "simple")} className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>Simple</button>
                    <button onClick={() => handleChangeFilter("type", "rugged")} className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>Rugged</button>
                    <button onClick={() => handleChangeFilter("type", "luxury")} className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}>Luxury</button>

                    {
                        typeFilter
                            ? (<button onClick={() => setSearchParameter({})}>Clear-Filters</button>)
                            : null
                    }

                </div>
                <div className="van-list">
                    {vanElements}
                </div >
            </>
        )
    }

    return (

        <div className="van-list-container">
            <h1>Explore our Van Options </h1>
            <Suspense fallback={<h2>Loading your Vans...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </Suspense>
        </div>


    );
}

export default Vans;