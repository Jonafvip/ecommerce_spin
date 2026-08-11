import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonTable = () => {
  return (
    <div className="w-full flex border-2 border-gray-200 dark:border-zinc-800 rounded-md  overflow-hidden">
      <div className="flex gap-4 bg-gray-100 dark:bg-zinc-900 px-4 py-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            className="flex gap-4 border-t border-gray-100 dark:border-zinc-800 px-4 py-4"
            key={index}
          >
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
};
