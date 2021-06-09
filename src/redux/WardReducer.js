const initState = {
  list: [],

  refward: {},
  sampleList: ["Delhi", "Kolkata", "Chennai", "Mumbai"],
};

// ACTION TYPES
const WARD_CREATE = "WARD_CREATE";
const WARD_UPDATE = "WARD_UPDATE";
const WARD_DELETE = "WARD_DELETE";
const WARD_GET_ALL = "WARD_GET_ALL";
const WARD_GET_BY_ID = "WARD_GET_BY_ID";

const REF_WARD = "REF_WARD";

// ACTIONS :: COmponents are interacting with this action
export function createWardAction(payload) {
  // return { type: WARD_CREATE, payload: payload };

  // MAKE SURE redux-thunk is installed.
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/ward/";
    const requestBody = { ...payload, age: 30 };

    // HTTP Client
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // UPDATE THE UI
    dispatch({ type: WARD_CREATE, payload: payload });
  };
}

export function updateWardAction(payload) {
  // return { type: WARD_UPDATE, payload: payload };
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = `http://localhost:8080/api/ward/${payload.id}`;
    const requestBody = { ...payload, age: 25 };

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    // update the ui.
    dispatch(updateRefWard({}));
  };
}

export function deleteWardAction(payload) {
  // return { type: WARD_DELETE, payload: payload };

  // redux thunk
  return async (dispatch) => {
    const url = `http://localhost:8080/api/ward/${payload.id}`;
    await fetch(url, { method: "DELETE" });

    // update the ui.
    dispatch(getAllWardAction());
  };
}

export function getAllWardAction(payload) {
  // return { type: WARD_GET_ALL, payload: payload };

  // API CALL/BACKEND CALL / REDUX-THUNK IS THERE
  return async (dispatch) => {
    // WE HV TO CALL THE SPRINT1 / SPRING BOOT
    const url = "http://localhost:8080/api/ward/";

    // HTTP Client / POSTMAN / SWAGGER
    const response = await fetch(url);
    const wardList = await response.json();
    console.log(wardList);

    // Update the UI
    dispatch({ type: WARD_GET_ALL, payload: wardList });
  };
}

export function getByIdWardAction(payload) {
  // return { type: WARD_GET_BY_ID, payload: payload };
  return async (dispatch) => {
    const url = `http://localhost:8080/api/ward/${payload.id}`;
    const response = await fetch(url);
    const wardObj = await response.json();

    // this wil update the refemp
    dispatch(updateRefWard(wardObj));
  };
}

export function updateRefWard(payload) {
  return { type: REF_WARD, payload: payload };
}

// REDUCER LOGIC
export function WardReducer(state = initState, action) {
  switch (action.type) {
    case WARD_CREATE:
      return { ...state, list: [action.payload, ...state.list] };
    case WARD_UPDATE:
      // TODO
      return state;
    case WARD_DELETE:
      // TODO
      const oldList = state.list;
      oldList.splice(action.payload, 1);
      console.log("OL", oldList);

      return { ...state, list: [...oldList] };
    case WARD_GET_ALL:
      // Update the list
      return { ...state, list: action.payload };
    case WARD_GET_BY_ID:
      // TODO
      return state;

    case REF_WARD:
      return { ...state, refward: action.payload };

    default:
      return state;
  }
}