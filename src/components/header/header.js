import { Link } from "react-router-dom";
function header() {

    return (
        <>
            <div className='w-full'>
                <nav className='md:flex md:flex-row  flex flex-row w-full justify-between p-0 m-0 md:place-items-start'>
                    <div className='md:basis-1/5 flex flex-row md:justify-center w-1/2'>
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
                    <div className='md:basis-2/5 flex flex-row pl-0 pr-0 w-1/2'>
                        <div className='w-full flex flex-row justify-center'>
                            <button className='rounded-xl w-full md:w-2/3 hover:scale-110  transition duration-300 ease-in-out h-10 md:px-5 overflow-hidden ' >
                                What is dao?
                            </button>
                        </div>
                        <div className='flex w-full flex-row justify-center '>
                        <Link to='/lauch-dao'>
                            <button className='rounded-xl w-full md:w-2/3 hover:scale-110 transition duration-300 ease-in-out h-10 md:px-2 overflow-hidden flex flex-row justify-center'>
                            <img alt='pandao logo' src={process.env.PUBLIC_URL + "/images/rocket.png"} className='h-7' />
                            <span className="text-white"> Launch DAO</span>  
                            </button>
                        </Link>    

                        </div>

                    </div>

                </nav>

            </div>
        </>
    )

}

export default header;