import { useQuery } from '@tanstack/react-query'
import { getBooking } from '../../services/apiBookings'
import { useParams } from 'react-router-dom'

const useBooking = () => {
    const {bookingId} = useParams();
    console.log("id on useBooking",bookingId);
    
    const{isLoading, data:booking, error} = useQuery({
        queryKey:["booking",bookingId],
        queryFn: ()=> getBooking(bookingId),
        retry: false,
    });

    return {isLoading, booking, error};
}

export default useBooking