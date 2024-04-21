import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
function Header() {



    const [hmburgerAnimation,setHmburgerAnimation] = useState('') 
    const [menuOpen, setMenuOpen] = useState(false)
    const toggelMenu = () => {
        if (menuOpen){
            setHmburgerAnimation('fade-in-from-left')
        }else{
            setHmburgerAnimation('')
        }
        setMenuOpen(!menuOpen)
        
    }





    return (
        <>
            <div className='w-full'>
                <nav className='md:flex md:flex-row  flex flex-row w-full justify-between p-0 m-0 md:place-items-start'>
                    <div className='md:basis-1/5 flex flex-row md:justify-center w-1/2 pt-5'>
                        <Link to='/'> <img alt='pandao logo' src={process.env.PUBLIC_URL + "/images/logo.png"} className='h-16' /></Link>
                    </div>
                    <div className='hidden md:flex  md:basis-2/5 justify-left pt-4 pr-0 '>
                        <div className='flex flex-row justify-center w-full px-2'>
                            <span className='px-2 text-2xl underline font-bold hover:scale-110 transition duration-300 ease-in-out text-white'><Link to='/about-us'>About us</Link></span>
                            <span className='px-2 text-2xl font-bold text-white'>|</span>
                            <span className='px-2 text-2xl underline font-bold hover:scale-110 transition duration-300 ease-in-out text-white'><Link to='/product'>Products</Link></span>
                            <span className='px-2 text-2xl font-bold text-white'>|</span>
                            <span className='px-2 text-2xl underline  font-bold hover:scale-110 transition duration-300 ease-in-out text-white'><Link to="/resource">Resources</Link></span>
                        </div>
                    </div>
                    <div className='hidden md:basis-2/5 md:flex flex-row pl-0 pr-0 w-1/2'>
                        <div className='w-full flex flex-row justify-center'>
                            <button className='rounded-xl w-full md:w-2/3 hover:scale-110  transition duration-300 ease-in-out h-10 md:px-5 overflow-hidden bg-violet-600 ' >
                                What is dao?
                            </button>
                        </div>
                        <div className='flex w-full flex-row justify-center '>
                            <Link to='/lauch-dao'>
                                <button className='rounded-xl w-full md:w-full hover:scale-110 transition duration-300 ease-in-out h-10 md:px-2 overflow-hidden flex flex-row justify-center bg-violet-600'>
                                    <img alt='pandao logo' src={process.env.PUBLIC_URL + "/images/rocket.png"} className='h-7' />
                                    <span className="text-white"> Launch DAO</span>
                                </button>
                            </Link>

                        </div>

                    </div>
                    <div className=' absolute w-full h-full md:hidden  bg-opacity-0 flex flex-col '>
                        <div className='flex flex-row justify-end'>
                            <img onClick={toggelMenu} alt='pandao logo' src={process.env.PUBLIC_URL + "/images/hamburger2.png"} className='h-16 bg-green-700 p-0 bg-opacity-0' />
                        </div>
                        <div className='flex flex-row justify-end'>
                            <div className={`${hmburgerAnimation}`}>
                            {
                                menuOpen && (
                                    <div class="right-auto  z-10 bg-white  rounded-lg shadow w-44 dark:bg-gray-700 ">
                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li className='flex flex-row justify-center'>
                                                <Link to='about-us'><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About us</a></Link>
                                            </li>
                                            <li className='flex flex-row justify-center'>
                                                <Link to='/product'><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Product</a></Link>
                                            </li>
                                            <li className='flex flex-row justify-center'>
                                                <Link to='/resource'><a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Resource</a></Link>
                                            </li>
                                            <li className='flex flex-row justify-center'>
                                                <button className='rounded-xl w-2/3 md:w-1/3 hover:scale-110  transition duration-300 ease-in-out h-10 md:px-5 overflow-hidden text-sm ' >
                                                    What is dao?
                                                </button>
                                            </li>
                                            <li className='flex flex-row justify-center'>
                                                <Link to='/lauch-dao'>
                                                    <button className='rounded-xl w-full md:w-2/3 hover:scale-110 transition duration-300 ease-in-out h-10 md:px-2 overflow-hidden flex flex-row justify-center text-sm'>
                                                        <img alt='pandao logo' src={process.env.PUBLIC_URL + "/images/rocket.png"} className='h-7' />
                                                        <span className="text-white"> Launch DAO</span>
                                                    </button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )

                            }


                            </div>
                            
                        </div>



                    </div>

                </nav>

            </div>
        </>
    )

}

export default Header 