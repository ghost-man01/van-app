import { Link } from "react-router-dom";
import Footer from "../components/Footer"

export default function NotFound() {

    return (
        <>
            <section>
                <h1>Page Not Found</h1>
                <Link to='/'>Return Home</Link>
            </section>
            <Footer />
        </>
    );
}