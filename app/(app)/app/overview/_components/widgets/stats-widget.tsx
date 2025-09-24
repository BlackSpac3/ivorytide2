import { Button } from "@/components/ui/button";
import React from "react";
import StatusIndicator from "../../../guests/_components/status-indicator";
import { Progress } from "@/components/ui/progress";

import Widget from "../widget";
import GuestDialog from "../../../_components/guest-dialog";
import { GuestFormDefault } from "@/schemas/guest.schema";
import { Stats } from "../../_page/OverviewPage";

interface Props {
  stats: Stats;
}

const StatsWidget: React.FC<Props> = ({ stats }) => {
  return (
    <Widget title="Stats">
      <div className=" space-y-4 w-full">
        <div className="flex justify-between items-center">
          <div className="text-sm leading-snug">
            <p>Last 30 days</p>
            <p className="text-muted-foreground">Updated 6h ago</p>
          </div>
          <GuestDialog mode="post" guest={GuestFormDefault}>
            <Button size="sm">Invite Guest</Button>
          </GuestDialog>
        </div>

        <div className="space-y-2">
          <div className="space-y-1">
            <span className="text-sm flex items-center gap-2">
              <StatusIndicator status="invited" />
              Invited
            </span>
            <Progress
              value={(stats.invited / stats.guests) * 100}
              className=" [&>div]:rounded-full"
            />
            <div className="w-full text-xs justify-between flex text-muted-foreground">
              <span>{stats.invited}</span>
              <span>{stats.guests}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm flex items-center gap-2">
              <StatusIndicator status="confirmed" />
              Confirmed
            </span>
            <Progress
              value={(stats.confirmed / stats.guests) * 100}
              className="  [&>div]:rounded-full"
            />
            <div className="w-full text-xs justify-between flex text-muted-foreground">
              <span>{stats.confirmed}</span>
              <span>{stats.guests}</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm flex items-center gap-2">
              <StatusIndicator status="declined" />
              Declined
            </span>
            <Progress
              value={(stats.declined / stats.guests) * 100}
              className="  [&>div]:rounded-full"
            />
            <div className="w-full text-xs justify-between flex text-muted-foreground">
              <span>{stats.declined}</span>
              <span>{stats.guests}</span>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  );
};

export default StatsWidget;
