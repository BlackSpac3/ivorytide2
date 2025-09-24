import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import React from "react";

const GuestsTableLoader = ({ count }: { count: number }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <TableRow key={index}>
        {/* Name */}
        <TableCell className="py-3 pl-4  max-w-[260px] truncate">
          <div className="flex items-center gap-3">
            <span>
              <Skeleton className="size-10 rounded-full" />
            </span>
            <span className="font-medium capitalize">
              <Skeleton className="h-4 w-[100px]" />
            </span>
          </div>
        </TableCell>
        {/* Status */}
        <TableCell>
          <div className="flex items-center gap-1">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-4 max-h-4 w-[60px]" />
          </div>
        </TableCell>
        {/* Invited By */}
        <TableCell>
          <div className="justify-end flex px-2 items-center ">
            <span className="flex items-center gap-2">
              <Skeleton className="h-4 max-h-4 w-[200px]" />

              <Skeleton className="size-8 rounded-full" />
            </span>
          </div>
        </TableCell>
        {/* Actions */}
        <TableCell>
          <div className="justify-end flex px-2 items-center ">
            <div className="flex justify-end  items-center gap-2 flex-nowrap !w-fit !max-w-fit">
              <Button disabled variant="ghost" size="icon">
                <MoreHorizontal />
              </Button>
            </div>
          </div>
        </TableCell>
      </TableRow>
    ));
};

export default GuestsTableLoader;
