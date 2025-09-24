import React from "react";
import Main from "./main";
import PageHeader from "./page-header";
import ConetntWrapper from "./content-wrapper";
import { Info } from "lucide-react";

const ComingSoonPage = () => {
  return (
    <Main>
      <PageHeader title="Coming Soon" />
      <ConetntWrapper>
        <div className="flex items-center justify-center h-[300px]">
          <div className="max-w-xs flex flex-col items-center gap-2 text-center">
            <Info className="w-10 h-10 text-muted-foreground" />
            <h1 className="text-muted-foreground font-medium">
              This page is still in the works and will be available soon
            </h1>
          </div>
        </div>
      </ConetntWrapper>
    </Main>
  );
};

export default ComingSoonPage;
