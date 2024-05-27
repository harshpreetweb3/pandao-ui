import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BreadCrumb } from "./components/BreadCrumb";
import { Button } from "@/components/ui/button";

const DaoDetailsPage = () => {
  const param = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBluePrint = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blueprint/detail/${param.slug}`
        );
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blueprint data:", error);
      }
    };
    fetchBluePrint();
  }, [param.slug]);
  console.log(data);
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    const headerOffset = 80; // Adjust this value as needed
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };
  return (
    <div className="pt-20 pb-10  items-start gap-3 justify-start min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#281038] from-0% via-[#181734] via-50%  to-[#0D1E3B] to-100% text-black px-2">
      {data && (
        <div className="flex max-w-[1440px] mx-auto">
          <div className=" md:w-[70%] flex flex-col  mx-auto p-3 text-white gap-2">
            <div className=" ">
              <BreadCrumb name={param.slug} />
            </div>

            <div className="text-4xl font-bold mt-8 text-left">{data.slug}</div>
            <div className="text-xl font-bold mt-4 text-left">
              {" "}
              Description - {data.package_addr}
            </div>
            <div className="text-xl font-bold mt-2 text-left">
              Price - {data.price}
            </div>

            <div className="text-lg font-semibold text-left">
              {data.description}
            </div>
            <div className="text-lg font-semibold ">
              {data.terms &&
                data.terms.length > 0 &&
                data.terms.map((term, index) => (
                  <div
                    key={index}
                    id={`term-${index}`}
                    className="text-white flex flex-col gap-5"
                  >
                    <div className="text-4xl font-semibold text-left mt-5">
                      {term.term}
                    </div>
                    <div className="text-xl font-light">{term.description}</div>
                  </div>
                ))}
            </div>
            <Button
              onClick={() => {
                navigate(`/exploreDao/${param.slug}/deploy`);
              }}
              variant="outline"
              className="text-white bg-purple-600 hover:bg-purple-400 mt-5"
            >
              Deploy{" "}
            </Button>
          </div>
          {data && (
            <div className="text-white w-[30%] mt-20 md:block hidden mx-2  top-20">
              <div className="font-semibold text-xl">Table of content</div>
              <div className="text-lg font-semibold">
                {data.terms &&
                  data.terms.length > 0 &&
                  data.terms.map((term, index) => (
                    <div key={index} className="text-white flex flex-col gap-2">
                      <button
                        onClick={() => scrollToElement(`term-${index}`)}
                        className="text-lg font-semibold text-left mt-2 ml-5"
                      >
                        {term.term}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DaoDetailsPage;
