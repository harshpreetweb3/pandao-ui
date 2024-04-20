import {
    Routes,
    Route
} from 'react-router-dom';



import {  LandingPage  } from './pages/landing/landing'
import Resource from './pages/landing/resources.js'
import NotFound from './pages/notfound/404';
import LoginPage from './pages/signin/login';
import ContactUs from './pages/contactus/contactus';
import CandyMachine from './pages/test_pages/pandao_candy';
import Product from './pages/landing/product.js';
import Aboutus from './pages/landing/aboutus.js';
import ComingSoon from './pages/comingsoon.js/c_s.js';
 


function TestNotFound() {
    return (
        <>
            <h1 className='bg-red-700'>hii , this is wrong url</h1>
        </>
    )
}

function Routers() {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />}>
            
                <Route path='/resource' element={ <Resource/> } />
                <Route path='/product' element={ <Product/> } />
                <Route path='/about-us' element={ <Aboutus/> } />

            </Route>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/candy-machine' element={<CandyMachine />} />
            <Route path='/lauch-dao' element={<ComingSoon />} />
            <Route path="*" element={<TestNotFound />} />
        </Routes>


    )

}

export default Routers;