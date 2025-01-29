import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router";

const useCheckin = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const{isLoading: isCheckingIn, mutate: checkin}=useMutation({
        mutationFn: ({bookingId, breakfast})=> updateBooking(bookingId,{
            status : "checked-in",
            isPaid : true,
            ...breakfast,
        }),
    
        onSuccess: (data)=>{
            toast.success(`Booking #${data.id} sucessfully checked in`);
            queryClient.invalidateQueries({active:true});
            navigate("/")
        },

        onError:(error)=> {
            toast.error("There was an error while cheching in");
            console.log(error);
        }
      })

      return{isCheckingIn, checkin};
}

export default useCheckin