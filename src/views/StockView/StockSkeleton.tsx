import { Skeleton } from "@/components/shadcn/skeleton";

const StockSkeleton = () =>{
    return (
      
      <div className="w-full my-2">
  
      <Skeleton className="h-[200px] mb-2 w-full rounded-lg" />
      <Skeleton className="h-[40px] mb-2 w-1/2 rounded-lg" />
      <Skeleton className="h-[40px] mb-8 w-1/3 rounded-lg" />
      <Skeleton className="h-[200px] mb-2 w-full rounded-lg" />
      <Skeleton className="h-[40px] mb-2 w-1/2 rounded-lg" />
      <Skeleton className="h-[40px] mb-2 w-1/3 rounded-lg" />
      </div>
    
    )
  }

  export default StockSkeleton;