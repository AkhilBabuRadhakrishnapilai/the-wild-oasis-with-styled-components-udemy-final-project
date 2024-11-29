import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //sortBy
  const sortByRow = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //page count
  const pageCount = Math.ceil(page / PAGE_SIZE);
  //pre fetching
  //for next pages
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  //for previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1}),
    });

  return { isLoading, data, error, count };
}
export default useBookings;
