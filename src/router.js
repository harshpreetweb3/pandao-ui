import {
    Routes,
    Route
} from 'react-router-dom';

import About from './pages/aboutus/about'
import NotFound from './pages/notfound/404';
import LoginPage from './pages/signin/login';
import ContactUs from './pages/contactus/contactus';

function Routers() {
    return (
            <Routes>
                <Route path='/' element={<About/>}></Route>
                <Route path="*" element={<NotFound />} />
                <Route path='login' element={<LoginPage/>} />
                <Route path='contact-us' element={<ContactUs/>} />

            </Routes>


    )

}

export default Routers;