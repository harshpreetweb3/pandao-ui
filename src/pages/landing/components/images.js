import { useRef, useState, useEffect } from 'react'
import { useInViewport } from 'react-in-viewport';

function ReactTangleImages(props) {
    let [isVisible,setIsVisible] = useState(false)

    let myRef = useRef();
    let {
        inViewport,
        enterCount,
        leaveCount,
    } = useInViewport(
        myRef
    );

    useEffect( () =>{
        if ( inViewport ) {
            setIsVisible(true)
        }
       
        console.log('in view port change')
    },[inViewport])

    return (<>
        <div ref={myRef} className={`flex flex-col bg-white h-96 ${isVisible?'fade-in':''}`}>
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