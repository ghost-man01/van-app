import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';

import './App.css';
import About from './pages/about'
import Home from './pages/home'
import Login, { loginLoader, action as loginAction } from './pages/Login'
import NotFound from './pages/NotFound'
import Vans, { loader as vansLoader } from './pages/Vans/vans'
import VanDetail, { loader as vanDetailLoader } from './pages/Vans/VanDetail'
import Layout from './components/Layout'
import Error from './components/Error'
import Dashboard from './pages/Host/Dashboard'
import Reviews from './pages/Host/Reviews'
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans'
import HostVanDetail, { loader as HostVanDetailLoader } from './pages/Host/HostVanDetail'
import Income from './pages/Host/Income'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostLayout from './components/HostLayout';
import { requireAuth } from './utils'
import './server'


const route = createBrowserRouter(createRoutesFromElements(

  <Route path='/' element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route

      path="vans" element={<Vans />}

      loader={vansLoader}

      errorElement={<Error />}
    />

    <Route
      path="vans/:id"
      element={<VanDetail />}
      loader={vanDetailLoader}
      errorElement={<Error />}
    />

    <Route
      path='login'
      element={<Login />}
      loader={loginLoader}
      action={loginAction}
      errorElement={<Error />}
    />

    <Route path="host" element={<HostLayout />}>
      <Route
        index
        element={<Dashboard />}
        loader={async ({ request }) => await requireAuth(request)}
        errorElement={<Error />}
      />
      <Route
        path="reviews"
        element={<Reviews />}
        loader={async ({ request }) => await requireAuth(request)}
        errorElement={<Error />}
      />
      <Route
        path="income"
        element={<Income />}
        loader={async ({ request }) => await requireAuth(request)}
        errorElement={<Error />}
      />
      <Route
        path="vans"
        element={<HostVans />}
        loader={hostVansLoader}
        errorElement={<Error />}
      />

      <Route
        path="vans/:id"
        element={<HostVanDetail />}
        loader={HostVanDetailLoader}
        errorElement={<Error />}
      >
        <Route
          index
          element={<HostVanInfo />}
          loader={async ({ request }) => await requireAuth(request)}
          errorElement={<Error />}
        />
        <Route
          path='photo'
          element={<HostVanPhotos />}
          loader={async ({ request }) => await requireAuth(request)}
          errorElement={<Error />}
        />
        <Route
          path='pricing'
          element={<HostVanPricing />}
          loader={async ({ request }) => await requireAuth(request)}
          errorElement={<Error />}
        />
      </Route>
    </Route>
    <Route path='*' element={<NotFound />} />
  </Route >
));

function App() {
  return (

    <RouterProvider router={route} />

  );
}

export default App;
