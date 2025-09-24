"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";
import { Table, TableBody } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "../../_components/page-header";
import ConetntWrapper from "../../_components/content-wrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { renderPaginationItems } from "@/lib/utils/pagination";
import StatusFilter from "../_components/status-filter";
import GuestsTableLoader from "../_components/table/loader/guests-table-loader";
import GuestTable from "../_components/table/guests-table";
import GuestsEmptyTable from "../_components/table/guests-empty-table";
import Main from "../../_components/main";
import { useFetchGuests } from "@/lib/hooks/guest.query";
import GuestDialog from "../../_components/guest-dialog";
import { GuestFormDefault } from "@/schemas/guest.schema";

const GuestsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Read values from URL (URL is the source of truth)
  const qParam = searchParams.get("q") ?? ""; // null means "All"
  const statusesParam = searchParams.getAll("status") ?? [];
  const pageParam = Number(searchParams.get("page") ?? "1");
  const pageSizeParam = Number(searchParams.get("page_size") ?? "10");

  const setParams = useCallback(
    (
      updates: Record<string, string | number | string[] | null>,
      method: "push" | "replace" = "push"
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key); // remove existing values first

        if (
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          return;
        }

        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, String(v)));
        } else {
          params.set(key, String(value));
        }
      });

      const qs = params.toString();
      router[method](`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [router, pathname, searchParams]
  );

  const toggleStatus = (status: string) => {
    let nextStatuses: string[];

    if (statusesParam.includes(status)) {
      // remove it
      nextStatuses = statusesParam.filter((s) => s !== status);
    } else {
      // add it
      nextStatuses = [...statusesParam, status];
    }

    setParams({ status: nextStatuses, page: 1 });
  };

  const clearAllStatuses = () => {
    setParams({ status: [], page: 1 });
  };

  const [searchInput, setSearchInput] = useState(qParam);

  useEffect(() => {
    setSearchInput(qParam);
  }, [qParam]);

  // Debounce writing to URL
  useEffect(() => {
    const id = setTimeout(() => {
      // When search changes, reset page to 1
      if (searchInput !== qParam) {
        // Only reset to page 1 if search term changed
        setParams({ q: searchInput || null, page: 1 }, "replace");
      }
    }, 200);
    return () => clearTimeout(id);
  }, [searchInput, setParams, qParam]);

  const { data, isPending } = useFetchGuests({
    page: pageParam,
    pageSize: pageSizeParam,
    statuses: statusesParam,
  });

  const pagination = data?.pagination || {
    current_page: 1,
    has_next: false,
    has_prev: false,
    page_size: 10,
    total_count: 0,
    total_pages: 1,
  };

  const filteredGuests = useMemo(() => {
    return (data?.guests ?? []).filter((guest) => {
      const matchesSearch =
        !qParam ||
        guest.first_name.toLowerCase().includes(qParam.toLowerCase()) ||
        guest.last_name.toLowerCase().includes(qParam.toLowerCase());

      const matchesStatus =
        !statusesParam.length || statusesParam.includes(guest.status);

      return matchesSearch && matchesStatus;
    });
  }, [data?.guests, qParam, statusesParam]);

  const handlePageChange = (page: number) => setParams({ page });

  const startItem = (pagination.current_page - 1) * pagination.page_size + 1;
  const endItem = Math.min(
    pagination.current_page * pagination.page_size,
    pagination.total_count
  );

  return (
    <Main>
      <PageHeader
        title="Guests"
        desc="Invite, track, and manage all your wedding guests in one place."
        renderActions={
          <div>
            <GuestDialog mode="post" guest={GuestFormDefault}>
              <Button size="lg">
                <UserPlus />
                Invite Guest
              </Button>
            </GuestDialog>
          </div>
        }
      />
      <ConetntWrapper className="py-5 space-y-4">
        <div className="flex justify-end items-center gap-2">
          <div className="flex justify-end items-center gap-2 w-full">
            <div className="relative w-full  sm:max-w-[300px]">
              <Search className="size-4 stroke-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />

              <Input
                className="bg-background h-10 pl-9 w-full"
                placeholder="Search guests..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <StatusFilter
              statuses={statusesParam}
              toggleStatus={toggleStatus}
              clearAllStatuses={clearAllStatuses}
            />
          </div>
        </div>
        <div className="bg-card rounded-lg border">
          <Table>
            <TableBody>
              {isPending ? (
                <GuestsTableLoader count={pageSizeParam} />
              ) : filteredGuests.length > 0 ? (
                <GuestTable guests={filteredGuests} />
              ) : (
                <GuestsEmptyTable />
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section */}
        {pagination.total_count > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 ">
            {/* Results info and page size selector */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground w-full">
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <Select
                  value={String(pageSizeParam)}
                  onValueChange={(val) =>
                    setParams({ page_size: Number(val), page: 1 })
                  }>
                  <SelectTrigger className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <span>
                {startItem} - {endItem} of {pagination.total_count}
              </span>
            </div>

            {/* Pagination controls */}
            {pagination.total_pages > 1 && (
              <Pagination className=" w-fit">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(
                          Math.max(1, pagination.current_page - 1)
                        )
                      }
                      className={`cursor-pointer ${
                        !pagination.has_prev
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    />
                  </PaginationItem>
                  {renderPaginationItems({ pagination, handlePageChange })}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(
                          Math.min(
                            pagination.total_pages,
                            pagination.current_page + 1
                          )
                        )
                      }
                      className={`cursor-pointer ${
                        !pagination.has_next
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </ConetntWrapper>
    </Main>
  );
};

export default GuestsPage;
