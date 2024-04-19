function header() {

    return (
        <>
            <div className='w-full bg-gradient-to-r-fuchsia'>
                <nav className='md:flex md:flex-row  flex-row w-full justify-between'>
                    <div className=' basis-1/5'>
                        <div>
                            <img alt='pandao logo' />
                        </div>

                    </div>
                    <div className='hidden md:flex  basis-2/5 items-center justify-center pl-10 pr-10 '>
                        <div className='flex flex-row justify-between w-full px-2'>
                            <span className='text-2xl font-bold hover:scale-110 transition duration-300 ease-in-out'>Resources</span>
                            <span className='text-2xl font-bold '>|</span>
                            <span className='text-2xl font-bold hover:scale-110 transition duration-300 ease-in-out'>Products</span>
                            <span className='text-2xl font-bold '>|</span>
                            <span className='text-2xl font-bold hover:scale-110 transition duration-300 ease-in-out'>About us</span>
                        </div>
                    </div>
                    <div className=' basis-2/5 flex flex-row items-center justify-between'>
                        <div className='w-1/2 flex flex-row justify-center'>
                            <button className='rounded-xl w-2/3 hover:scale-110 transition duration-300 ease-in-out' >
                                <span className='text-2xl font-bold '>What is dao</span>
                            </button>
                                
                        </div>
                        <div className='w-1/2 items-center flex-row justify-center'>
                            <button className='rounded-xl w-2/3 hover:scale-110 transition duration-300 ease-in-out'>
                                <span className='text-2xl font-bold '>Launch DAO</span>
                            </button>

                        </div>

                    </div>

                </nav>

            </div>
        </>
    )

}

export default header;