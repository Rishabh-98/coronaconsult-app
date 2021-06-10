import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createWardAction,
  updateWardAction,
} from "../redux/WardReducer";

export function WardUpsert() {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  console.log(state);

  const [ID, setID] = useState(state.ward.refward.ID);
  const [name, setname] = useState(state.ward.refward.name);
  const [floor, setfloor] = useState(state.ward.refward.floor);
  const [oxygenAvalaibility, setoxygenAvailability] = useState(state.ward.refward.oxygenAvalaibility);
  const [vacancyStatus, setvacancyStatus] = useState(state.ward.refward.vacancyStatus);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateID = (e) => setID(e.target.value);
  const updatename = (e) => setname(e.target.value);
  const updatefloor = (e) => setfloor(e.target.value);
  const updateoxygenAvailability = (e) => setoxygenAvailability(e.target.value);
  const updatevacancyStatus = (e) => setvacancyStatus(e.target.value);

  const addWard = (e) => {
    e.preventDefault();
    console.log(ID, name, floor, oxygenAvalaibility, vacancyStatus);

    // THIS IS REDUX ACTION CALLING
    dispatch(
      createWardAction({
        ID,
        name,
        floor,
        oxygenAvalaibility,
        vacancyStatus,
      })
    );

    // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // A2: navigate to another page
    history.push("/list-ward");

    // reset the form
    setID("");
    setname("");
    setfloor("");
    setoxygenAvailability("");
    setvacancyStatus("");
  };

  const updateWard = () => {
    dispatch(
      updateWardAction({
        id: state.ward.refward.id,
        ID,
        name,
        floor,
        oxygenAvalaibility,
        vacancyStatus,
      })
    );

    // reset the form
    setID("");
    setname("");
    setfloor("");
    setoxygenAvailability("");
    setvacancyStatus("");
  };

  return (
    <div className="row">
      <div className="col-3 col-md-3 d-none d-md-block"></div>
      <div className="col-12 col-md-6">
        <h3 className="alert alert-secondary">
          {state.ward.refward.id ? "Update Ward" : "Create Ward"}
        </h3>

        {/** BELOW THESE TWO TAGS MUST BE CONDITIOANL */}
        {successOperation && (
          <div className="alert alert-success">Opeation Success</div>
        )}

        <div className="mb-1">
          <input
            type="text"
            value={ID}
            onChange={(e) => updateID(e)}
            className="form-control"
            placeholder="Enter Ward id"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={name}
            onChange={(e) => updatename(e)}
            className="form-control"
            placeholder="Enter Ward name"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={floor}
            onChange={(e) => updatefloor(e)}
            className="form-control"
            placeholder="Enter Ward floor"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={oxygenAvalaibility}
            onChange={(e) => updateoxygenAvailability(e)}
            className="form-control"
            placeholder="Enter Oxygen Availability Status"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={vacancyStatus}
            onChange={(e) => updatevacancyStatus(e)}
            className="form-control"
            placeholder="Enter Ward Vacancy Status"
          />
        </div>

        <div className="mb-1">
          {state.ward.refward.id ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Ward"
              onClick={(e) => updateWard()}
            />
          ) : (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Add Ward"
              onClick={(e) => addWard(e)}
            />
          )}
        </div>
      </div>
      <div className="col-3 col-md-3  d-none d-md-block"></div>
    </div>
  );
}