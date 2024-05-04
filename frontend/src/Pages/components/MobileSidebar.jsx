import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {Menu, Rocket} from "lucide-react"
import { Link } from "react-router-dom";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu/>
      </SheetTrigger>
      <SheetContent className="bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100%" >
        <SheetHeader>
          <SheetTitle>
            <img src="/logo.png" className="h-20" />
          </SheetTitle>
          <SheetDescription>
       <ul className="text-white  text-2xl flex flex-col gap-6 mt-10">
       <Link to="/aboutus">
            <li>About Us</li>
          </Link>

          <Link to="/products">
            <li>Products</li>
          </Link>
          <Link to="/resources">
            <li>Resources</li>
          </Link>
       </ul>
       <div className="flex flex-col mt-10 gap-4">
       <Button className="bg-purple-600 ">What is Dao?</Button>
          <Button className="bg-purple-600 flex items-center gap-2"><Rocket/>  <span>Launch Dao </span>  </Button>
       </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
