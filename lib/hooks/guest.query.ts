import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  ApiError,
  ApiResponse,
  ApiResponseData,
  IPagination,
} from "../types/api.types";
import { GuestFormType } from "@/schemas/guest.schema";
import { buildFormData, capitalizeStr } from "../utils/helpers";
import axios from "axios";
import { toast } from "sonner";
import { IGuest } from "../models/guest.model";

const fetchGuests = async ({
  qParam,
  page,
  pageSize,
  statuses,
}: {
  qParam?: string;
  page: number;
  pageSize: number;
  statuses: string[];
}) => {
  const params = new URLSearchParams();

  statuses.forEach((status) => {
    params.append("status", status);
  });

  const queryString = params.toString();
  const url = `/api/guests?q=${
    qParam ?? ""
  }&page=${page}&pageSize=${pageSize}&${queryString}`;

  const response = await axios.get<
    ApiResponseData<{ guests: IGuest[]; pagination: IPagination }>
  >(url);
  return response.data.data || { guests: [], pagination: {} };
};

export const useFetchGuests = ({
  qParam,
  page,
  pageSize,
  statuses,
}: {
  qParam?: string;
  page: number;
  pageSize: number;
  statuses: string[];
}) => {
  return useQuery({
    queryKey: ["guests", page, pageSize, qParam, statuses],
    queryFn: () => fetchGuests({ page, pageSize, qParam, statuses }),
  });
};

export const refreshGuests = ({
  queryClient,
}: {
  queryClient: QueryClient;
}) => {
  queryClient.invalidateQueries({
    queryKey: ["guests"],
  });
};

type AddGuestMutation = {
  mode: "post" | "get";
  guestId?: never;
  queryClient: QueryClient;
  onSave?: () => void;
};

type UpdateGuestMutation = {
  mode: "put" | "delete";
  guestId: string;
  queryClient: QueryClient;
  onSave?: () => void;
};

export type GuestMutation = AddGuestMutation | UpdateGuestMutation;

const guestMutationUrl = (
  mode: "post" | "get" | "put" | "delete",
  guestId: string
) => {
  switch (mode) {
    case "get":
      return null;
    case "post":
      return "/api/guests";
    case "put":
      return `/api/guests/${guestId}`;
    case "delete":
      return `/api/guests/${guestId}`;
    default:
      return null;
  }
};

export const useGuestMutation = ({
  mode,
  guestId,
  queryClient,
  onSave,
}: GuestMutation) => {
  return useMutation<
    ApiResponse<{ guest_id: string }>,
    ApiError,
    GuestFormType
  >({
    mutationFn: async (data) => {
      const url = guestMutationUrl(mode, guestId as string) as string;

      if (mode === "post" || mode === "put") {
        const formData = buildFormData(data);
        return axios[mode](url, formData);
      } else {
        return axios[mode](url);
      }
    },
    onSuccess: (response) => {
      toast.success(capitalizeStr(response.data.message));
      refreshGuests({ queryClient });
      onSave?.();
    },
    onError: (error) => {
      toast.error(
        capitalizeStr(
          error.response?.data.error ??
            "Something went wrong. Please try again."
        )
      );
    },
  });
};
