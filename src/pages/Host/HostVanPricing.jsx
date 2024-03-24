import { useOutletContext } from "react-router-dom"

export default function HostVanPricing() {

    const { currentVan } = useOutletContext();
    return <h1>${currentVan.price}<span>/day</span></h1>
}