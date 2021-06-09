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

  const [firstName, setFirstName] = useState(state.ward.refward.firstName);
  const [lastName, setLastName] = useState(state.ward.refward.lastName);
  const [userName, setUserName] = useState(state.ward.refward.userName);
  const [password, setPassword] = useState(state.ward.refward.password);
  const [email, setEmail] = useState(state.ward.refward.email);
  const [mobile, setMobile] = useState(state.ward.refward.mobile);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateUserName = (e) => setUserName(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updateMobile = (e) => setMobile(e.target.value);

  const addWard = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, userName, password, email, mobile);

    // THIS IS REDUX ACTION CALLING
    dispatch(
      createWardAction({
        firstName,
        lastName,
        userName,
        email,
        password,
        mobile,
      })
    );

    // A1 sucess
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // A2: navigate to another page
    // history.push("/list-employee");

    // reset the form
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setMobile("");
  };

  const updateWard = () => {
    dispatch(
      updateWardAction({
        id: state.ward.refward.id,
        firstName,
        lastName,
        userName,
        email,
        mobile,
        password,
      })
    );

    // reset the form
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    setEmail("");
    setMobile("");
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
            value={firstName}
            onChange={(e) => updateFirstName(e)}
            className="form-control"
            placeholder="Enter First name"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={lastName}
            onChange={(e) => updateLastName(e)}
            className="form-control"
            placeholder="Enter Lastname"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={userName}
            onChange={(e) => updateUserName(e)}
            className="form-control"
            placeholder="Enter Username"
          />
        </div>

        <div className="mb-1">
          <input
            type="password"
            value={password}
            onChange={(e) => updatePassword(e)}
            className="form-control"
            placeholder="Enter Password"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={email}
            onChange={(e) => updateEmail(e)}
            className="form-control"
            placeholder="Enter Email"
          />
        </div>

        <div className="mb-1">
          <input
            type="text"
            value={mobile}
            onChange={(e) => updateMobile(e)}
            className="form-control"
            placeholder="Enter Mobile"
          />
        </div>

        <div className="mb-1">
          {state.ward.refward.id ? (
            <input
              type="button"
              className="btn btn-secondary w-100"
              value="Update Ward"
              onClick={() => updateWard()}
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