import {
    Breadcrumb,

    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

  
  export function BreadCrumb({name}) {
    return (
      <Breadcrumb className="text-black cursor-pointer">
        <BreadcrumbList>
        <BreadcrumbItem className="text-black hover:text-slate-400">
            <BreadcrumbLink href="/explore">Explore</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-black" />
       
          <BreadcrumbItem className="text-black hover:text-slate-400">
            <BreadcrumbLink>{name}</BreadcrumbLink>
          </BreadcrumbItem>
         
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  