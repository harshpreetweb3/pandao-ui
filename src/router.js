import {
    Routes,
    Route
} from 'react-router-dom';

import Landing from './pages/landing/landing'
import NotFound from './pages/notfound/404';
import LoginPage from './pages/signin/login';
import ContactUs from './pages/contactus/contactus';

function Routers() {
    return (
            <Routes>
                <Route path='/' element={<Landing/>}></Route>
                <Route path="*" element={<NotFound />} />
                <Route path='login' element={<LoginPage/>} />
                <Route path='contact-us' element={<ContactUs/>} />

            </Routes>


    )

}

export default Routers;