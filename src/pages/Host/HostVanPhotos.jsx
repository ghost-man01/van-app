import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {

    const { currentVan } = useOutletContext();
    return <section>
        <img src={currentVan.imageUrl} alt="photoVan" />
    </section>
}