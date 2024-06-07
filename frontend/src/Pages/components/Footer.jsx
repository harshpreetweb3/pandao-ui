import { Facebook, Github, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="flex items-center justify-center mx-auto border-t-2  bg-gradient-to-r from-[#375e91] from-0%  to-[#68237b] text-white">
      <div className="w-full flex md:flex-row flex-col max-w-[1440px] p-5">
        <div className="flex flex-col gap-2 items- w-1/2">
          <img src="/logo.png"alt="Logo" className='h-16 w-44 aspect-square'/>
          <div className="px-3">
            © 2024 
          </div>
 
        </div>
        <div className="mt-10 flex md:flex-row flex-col gap-x-40 gap-y-10 w-full justify-start ">
          {/* <div className="flex flex-col gap-2 items-start justify-start ">
            <div className="px-3 font-bold  text-lg ">Services</div>
            <ul className="px-3 flex flex-col gap-2">
              <li>Blockchain </li>
              <li>AI Solutions</li>
              <li>Digital Marketing</li>
              <li>Fullstack AI & Blockchain</li>
            </ul>
          </div> */}
          <div className="flex flex-col gap-2 items-start justify-start ">
            <div className="px-3 font-bold  text-lg ">Quick Links</div>
            <ul className="px-3 flex flex-col gap-2">
              <Link to="/aboutus">
                {' '}
                <li>About us</li>
              </Link>

              <Link to="/work">
                {' '}
                <li>Our Work</li>
              </Link>
              <Link to="/teams">
                {' '}
                <li>Our Team</li>
              </Link>
              <Link to="/blog">
                {' '}
                <li>Blog</li>
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-2 items-start justify-start ">
            <div className="px-3 font-bold  text-lg ">Follow us on</div>
            <ul className="px-3 flex flex-col gap-2">
              <Link to="/" target="_blank">
                {' '}
                <li className="flex  items-center gap-2">
                  {' '}
                  <Twitter className="h-4 w-4 " /> <span> Twiiter</span>{' '}
                </li>
              </Link>
              <Link to="/" target="_blank">
                {' '}
                <li className="flex  items-center gap-2">
                  {' '}
                  <Linkedin className="h-4 w-4 " /> <span> LinkedIn</span>{' '}
                </li>
              </Link>
              <Link to="/" target="_blank">
                {' '}
                <li className="flex  items-center gap-2">
                  {' '}
                  <Facebook className="h-4 w-4 " /> <span> Facebook</span>{' '}
                </li>
              </Link>
              <Link to="/" target="_blank">
                {' '}
                <li className="flex  items-center gap-2">
                  {' '}
                  <Github className="h-4 w-4 " /> <span> Github</span>{' '}
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer