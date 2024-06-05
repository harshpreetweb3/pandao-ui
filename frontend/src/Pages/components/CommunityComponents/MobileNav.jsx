import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronLeft, Menu, Rocket } from "lucide-react";
import { Link, NavLink, useParams } from "react-router-dom";

const MobileNav = () => {
  const params = useParams();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent className="bg-slate-100">
        <SheetHeader>
          <SheetTitle>
            <img src="/logo.png" className="h-20" />
          </SheetTitle>
          <SheetDescription>
            <ul className="text-white  text-2xl flex flex-col gap-6 mt-10">
         
          <NavLink
            to={`/community/detail/${params.id}`}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-800 w-40   text-center py-2 px-4 rounded-lg font-semibold"
                : "bg-transparent text-black w-40 text-center py-2 px-4 rounded-lg hover:text-[#003bf5] "
            }
            end
          >
            <li>Dashboard</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/members`}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-800 w-40 text-center py-2 px-4 rounded-lg font-semibold"
                : "bg-transparent text-black w-40 text-center py-2 px-4 rounded-lg hover:text-[#003bf5] "
            }
            end
          >
            <li>Members</li>
          </NavLink>
          <NavLink
            to={`/community/detail/${params.id}/comments`}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-blue-800 w-40 text-center py-2 px-4 rounded-lg font-semibold"
                : "bg-transparent text-black w-40 text-center py-2 px-4 rounded-lg hover:text-[#003bf5] "
            }
            end
          >
            <li>Comments</li>
          </NavLink>
            </ul>
            <div className="flex flex-col mt-10 gap-4">
              
              <div className="w-full">
              <radix-connect-button />

              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
