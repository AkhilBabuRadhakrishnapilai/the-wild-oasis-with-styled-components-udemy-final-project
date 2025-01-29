import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"

const useCheckOut = () => {
  
    const queryClient = useQueryClient();

    const{isLoading: isCheckingOut, mutate: checkout} = useMutation({
    mutationFn: (bookingId)=> updateBooking(bookingId,{
        status: "check-out",
    }),

    onSuccess: (data)=>{
        toast.success(`Booking ${data.id} sucessfully checked out`);
        queryClient.invalidateQueries({active:true});
    },

    onError:()=> toast.error("There is an error happend during check out")
  })

  return{isCheckingOut, checkout};
}

export default useCheckOut