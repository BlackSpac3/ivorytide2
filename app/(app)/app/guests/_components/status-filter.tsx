import React from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import StatusIndicator from "./status-indicator";

interface Props {
  statuses: string[];
  toggleStatus: (status: string) => void;
  clearAllStatuses: () => void;
}
const StatusFilter: React.FC<Props> = ({
  statuses,
  toggleStatus,
  clearAllStatuses,
}) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 font-normal">
          <div className="flex items-center">
            {statuses.includes("invited") && (
              <StatusIndicator status="invited" className=" -ml-0.5 " />
            )}
            {statuses.includes("confirmed") && (
              <StatusIndicator status="confirmed" className=" -ml-0.5 " />
            )}
            {statuses.includes("declined") && (
              <StatusIndicator status="declined" className=" -ml-0.5 " />
            )}
          </div>
          Status
          {statuses.length > 0 && (
            <Badge
              variant="secondary"
              className="font-normal text-xs rounded-full">
              {statuses.length}/3
            </Badge>
          )}
          <ChevronDown className="stroke-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {statuses.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={clearAllStatuses}
            className="w-full">
            Clear All
          </Button>
        )}
        {statuses.length > 0 && <DropdownMenuSeparator />}
        <DropdownMenuCheckboxItem
          checked={statuses.includes("invited")}
          onCheckedChange={() => toggleStatus("invited")}>
          Invited
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statuses.includes("confirmed")}
          onCheckedChange={() => toggleStatus("confirmed")}>
          Confirmed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statuses.includes("declined")}
          onCheckedChange={() => toggleStatus("declined")}>
          Declined
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusFilter;
