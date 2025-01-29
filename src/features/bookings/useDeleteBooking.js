import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"

const useDeleteBooking = () => {
    const queryClient = useQueryClient();
    const{isLoading: isDeleting, mutate: delBooking} = useMutation({
    mutationFn: (bookingId)=>deleteBooking(bookingId),
    onSuccess: (data)=>{
      console.log(data)
        toast.success("Booking Deleted Successfully"),
        queryClient.invalidateQueries({active:true})
    },
    onError:(err)=> {
      console.log(err);
      toast.error("An Error occurred while deleting the Booking")
    }
  })
  return{isDeleting, delBooking};
}

export default useDeleteBooking