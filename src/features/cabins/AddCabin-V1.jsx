import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button
        variation="primary"
        size="large"
        onClick={() => setShowModal(!showModal)}
      >
        Add New Cabin
      </Button>
      {showModal && (
        <Modal onClose={setShowModal}>
          <CreateCabinForm onClose={() => setShowModal(!showModal)} />
        </Modal>
      )}
    </>
  );
};

export default AddCabin;
