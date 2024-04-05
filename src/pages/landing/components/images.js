function ReactTangleImages(props) {
    return (<>
        <div className="flex flex-col bg-white h-96">
            <div className='h-2/3'>
                <img src='https://i.ibb.co/cXxJTmC/download.jpg' />
            </div>
            <div className='justify-center h-1/3 bg-red'>
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-row justify-center'>
                        <span>Sample heading</span>

                    </div>
                    <div className='flex flex-row justify-center'>
                        <span>sample content to write here</span>

                    </div>


                </div>
            </div>
        </div>
    </>)


}
export default ReactTangleImages;