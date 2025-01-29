import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { formatCurrency } from "../../utils/helpers";
import { useMoveBack } from "../../hooks/useMoveBack";
import {useSettings} from "../settings/useSettings";
import useBooking  from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import useCheckin from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const[isPaid, setIsPaid] = useState(false);
  const[addBreakfast, setAddBreakfast] = useState(false);
  const {isLoading, booking} = useBooking();
  const{isLoading: isLoadingSettings, settings} = useSettings();

  useEffect(()=>{
    setIsPaid(booking?.isPaid ?? false)
  },[booking])

  const moveBack = useMoveBack();

  const{isCheckingIn, checkin} = useCheckin();


  if(isLoading || isLoadingSettings) return <Spinner/>;
  
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  
  const optionalBreakfast = settings.breakfastPrice * numNights * numGuests;
  
  function handleCheckin() {
    if(!isPaid) return;

    if(addBreakfast){
      checkin({bookingId, breakfast:{
        hasBreakfast:true,
        extrasPrice: optionalBreakfast,
        totalPrice: totalPrice + optionalBreakfast,
      }})
    }
    else{
      checkin({bookingId, breakfast:{}});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox checked={addBreakfast}
          onChange={()=> {
            setAddBreakfast((add)=> !add);
            setIsPaid(false);
          }}
          
        >
          Want to add breakfast for {formatCurrency(optionalBreakfast)}?
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox checked={isPaid} 
          onChange={()=>setIsPaid((paid)=> !paid)}
          disabled={isPaid || isCheckingIn}
          id="confirm"
          >
          I confirm that {guests.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfast)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfast)})`}</Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
