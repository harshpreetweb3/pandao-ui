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
      <Breadcrumb className="text-white">
        <BreadcrumbList>
        <BreadcrumbItem className="text-white hover:text-white/80">
            <BreadcrumbLink href="/exploreDao">Explore</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-white" />
       
          <BreadcrumbItem className="text-white hover:text-white/80">
            <BreadcrumbLink>{name}</BreadcrumbLink>
          </BreadcrumbItem>
         
        </BreadcrumbList>
      </Breadcrumb>
    )
  }
  