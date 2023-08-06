import { TRUCK_SELECTED } from "@/context/Actions/actions";

export default function truckReducer(state, action) {
  switch (action.type) {
    case TRUCK_SELECTED:
      return {
        LoadId: action.payload.LoadId,
        TruckNumber: action.payload.TruckNumber,
        TruckStatus: action.payload.TruckStatus,
      };

    default:
      return state;
  }
}
