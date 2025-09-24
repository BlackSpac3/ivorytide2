import React, { ReactNode } from "react";
import ConetntWrapper from "./content-wrapper";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  desc?: string;
  className?: string;
  renderActions?: ReactNode;
}

const PageHeader: React.FC<Props> = ({
  title,
  desc,
  renderActions,
  className,
}) => {
  return (
    <div
      className={cn(
        "min-h-32 py-4 w-full border-b flex items-center",
        className
      )}>
      <ConetntWrapper>
        <div className="flex justify-between items-end flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-medium">{title}</h1>
            {desc && <p className="text-sm text-muted-foreground">{desc}</p>}
          </div>

          {renderActions}
        </div>
      </ConetntWrapper>
    </div>
  );
};

export default PageHeader;
