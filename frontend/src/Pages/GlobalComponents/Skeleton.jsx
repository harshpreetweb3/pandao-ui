import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 bg-slate-50 p-5">
      <Skeleton className="h-[50px] w-[50px] rounded-full bg-purple-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-purple-200" />
        <Skeleton className="h-4 w-[200px] bg-purple-200" />
      </div>
    </div>
  )
}
