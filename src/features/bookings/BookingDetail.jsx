import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  
  const navigate = useNavigate();
  const {isLoading, booking} = useBooking();
  console.log(booking,"on BookingDetail")
  
  const{isCheckingOut, checkout} = useCheckOut();
  const{isDeleting, delBooking} = useDeleteBooking();
  const moveBack = useMoveBack();

  if(isLoading) return <Spinner/>;
  
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  
  const {status, id:bookingId} = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

    <Modal>
      <ButtonGroup>
        {
          status === "unconfirmed" && <Button onClick={()=>navigate(`/checkin/${bookingId}`)}>Checkin</Button>
        }
        {
          status === "checked-in" && <Button onClick={()=> {
            checkout(bookingId);
            navigate(`/bookings`)
          }} disabled={isCheckingOut}>Check Out</Button>
        }
        
        <Modal.Open opens="delete">
          <Button variation="danger">Delete</Button>
        </Modal.Open>

        <Button variation="secondary" onClick={moveBack}>Back</Button>
      </ButtonGroup>

      <Modal.Window name="delete">
        <ConfirmDelete resourceName="booking" onConfirm={()=>{
          delBooking(bookingId,{
            onSettled: ()=> navigate(-1),
          });
        }}/>
      </Modal.Window>
    </Modal>
    </>
  );
}

export default BookingDetail;
