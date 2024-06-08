import OrbitingCircles from "@/components/ui/myComponents/orbitingCircl";
import {  LibraryBig } from "lucide-react";

export function ResourcesAnimation() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg  bg-transparent ">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-400 to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        DAO
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="h-[30px] w-[40px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
       
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[30px] w-[300px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <div className="border-2 rounded-full p-2 bg-blue-600">
What is DAO
        </div>
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        reverse
        radius={190}
        duration={20}
      >
       <div className="border-2 rounded-full p-2">
         <LibraryBig className="h-20 w-20 text-blue-200" />

        </div>
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        reverse
        radius={190}
        duration={20}
        delay={20}
      >
      </OrbitingCircles>
    </div>
  );
}
