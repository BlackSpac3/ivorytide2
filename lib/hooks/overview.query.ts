import axios from "axios";
import { ApiResponseData, IOverview } from "../types/api.types";
import { useQuery } from "@tanstack/react-query";

const fetchOverviewData = async () => {
  const response = await axios.get<ApiResponseData<IOverview>>("/api/overview");
  return response.data.data;
};

export const useFetchOverviewdata = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: fetchOverviewData,
    enabled,
  });
};
