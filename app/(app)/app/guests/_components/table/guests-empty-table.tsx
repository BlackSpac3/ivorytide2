import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const GuestsEmptyTable = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="h-24 text-center">
        No guest yet, invite someone
      </TableCell>
    </TableRow>
  );
};
export default GuestsEmptyTable;
