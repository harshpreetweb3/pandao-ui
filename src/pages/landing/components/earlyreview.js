function EarlyReview() {

    return (
        <>
            <div className='h-screen flex flex-row w-screen '>
                <div className='flex flex-col w-1/2'>
                    <div className="flex flex-row justify-center flex-wrap">
                        <span className='text-white text-6xl pt-10 mt1-0'>Early reviews</span>
                    </div>
                    <div>

                    </div>

                </div>
                <div className='flex flex-col w-1/2'>
                    <RectangleBoxLayout/>
                    <RectangleBoxLayout/>
                    <RectangleBoxLayout/>

                </div>

            </div>
        </>
    )

}

function RectangleBoxLayout(props) {
    return (
        <>
            <div className='flex flex-col p-10 m-5 border-2'>
                <div className="pl-20">
                    <span className='text-white'> Some random text</span>
                </div>
                <div className="pl-20">
                    <span className='text-fuchsia-700'> Some more random text</span>
                </div>

            </div>
        </>
    )



}

export default EarlyReview