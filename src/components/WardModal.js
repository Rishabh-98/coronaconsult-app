import { Button, ListGroup, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateRefWard } from "../redux/WardReducer";

export function WardModal() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const updateRefObj = () => {
    dispatch(updateRefWard({}));
  };

  return (
    <Modal show={state.ward.refward.id} onHide={() => updateRefObj()}>
      <Modal.Header closeButton>
        <Modal.Title>Hello, {state.ward.refward.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            Ward ID - {state.ward.refward.ID}
          </ListGroup.Item>
          <ListGroup.Item>
            Name - {state.ward.refward.name}
          </ListGroup.Item>
          <ListGroup.Item>
            Floor - {state.ward.refward.floor} 
          </ListGroup.Item>
          <ListGroup.Item>Oxygen Availability - {state.ward.refward.oxygenAvailability}</ListGroup.Item>
          <ListGroup.Item>Vacancy Status - {state.ward.refward.vacancyStatus}</ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => updateRefObj()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}