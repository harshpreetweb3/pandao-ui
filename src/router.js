import {
    Routes,
    Route
} from 'react-router-dom';

import Landing from './pages/landing/landing'
import NotFound from './pages/notfound/404';
import LoginPage from './pages/signin/login';
import ContactUs from './pages/contactus/contactus';
import CandyMachine from './pages/test_pages/pandao_candy' ;

function Routers() {
    return (
            <Routes>
                <Route path='/' element={<Landing/>}></Route>
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/contact-us' element={<ContactUs/>} />
                <Route path='/candy-machine' element={<CandyMachine/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>


    )

}

export default Routers;