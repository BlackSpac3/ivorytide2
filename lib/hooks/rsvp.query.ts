import { useMutation } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "../types/api.types";
import { RsvpFormType } from "@/schemas/rsvp.schema";
import axios from "axios";
import { toast } from "react-toastify";

export const useRsvpMutation = ({
  onSave,
}: {
  onSave?: (url: string | null, filename: string) => void;
}) => {
  return useMutation<
    ApiResponse<{ invitation_url: string | null }>,
    ApiError,
    RsvpFormType
  >({
    mutationFn: async (data) => {
      return axios.put("/api/rsvp", data);
    },
    onSuccess: (response, variables) => {
      toast.success(response.data.message);
      {
        onSave?.(
          response.data.data.invitation_url,
          `${variables.first_name}-${variables.last_name}-Becoming-The-Jacobs-Invitation`
        );
      }
    },
    onError: (error) => {
      toast.error(
        error.response?.data.error ?? "Something went wrong. Please try again."
      );
    },
  });
};
