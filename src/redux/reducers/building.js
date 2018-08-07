import {
  SAVE_LIST_BUILDING,
  SAVE_DETAIL_BUILDING,
  GET_DETAIL_BUILDING,
  SAVE_ADD_BUILDING,
  SAVE_EDIT_BUILDING,
  SAVE_DELETE_BUILDING,
  SAVE_FLOORS,
  SAVE_CONDOS_BY_BUILDING,
  SAVE_DELETE_CONDO,
  SAVE_ADD_CONDO,
  SAVE_FLOOR
} from '../actions/types'

var initState = {
  building: '',
  // colors,
  buildings: [],
  seectedId: '',
  floors: [],
  condos: []
};


export const Building = (state = initState, action) => {
  switch (action.type) {
    //
    case SAVE_LIST_BUILDING:
      return { ...state, buildings: action.payload, building: action.payload[0], seectedId: action.payload[0].id }
    case SAVE_DETAIL_BUILDING:
      return { ...state, seectedId: action.payload.id, building: action.payload }
    case GET_DETAIL_BUILDING:
      return { ...state, seectedId: action.args[1] }
    case SAVE_ADD_BUILDING:
      state.buildings.unshift(action.payload)
      return { ...state, seectedId: action.payload.id, building: action.payload }
    case SAVE_EDIT_BUILDING:
      state.buildings = state.buildings.map(bd => {
        if (bd.id === action.payload.id) {
          return Object.assign({}, bd, action.payload)
        } else return bd
      })
      return { ...state, seectedId: action.payload.id, building: action.payload }
    case SAVE_DELETE_BUILDING:
      let { id, index } = action.payload
      state.buildings = state.buildings.filter(building => building.id !== id)

      if (index !== state.buildings.length) {
        state.seectedId = state.buildings[index].id
        state.building = state.buildings[index]
      } else {
        state.seectedId = state.buildings[index - 1].id
        state.building = state.buildings[index - 1]
      }
      return { ...state }


    //FLOOR
    case SAVE_FLOORS:
      return { ...state, floors: action.payload }
    case SAVE_FLOOR:
      state.floors = state.floors.map(bd => {
        if (bd.id === action.payload.id) {
          return Object.assign({}, bd, action.payload)
        } else return bd
      })
    return {...state}


    //CONDO
    case SAVE_CONDOS_BY_BUILDING:
      return { ...state, condos: action.payload }
    case SAVE_DELETE_CONDO:
      state.condos = state.condos.filter(c => c.id !== action.payload)
      return { ...state }
    case SAVE_ADD_CONDO:
      if (Array.isArray(action.payload)) {
        // state.condos = state.condos.concat(action.payload);
        return {
          ...state,
          condos: [...state.condos, ...action.payload]
        }
      }
      else
        state.condos = state.condos.map(bd => {
          if (bd.id === action.payload.id) {
            return Object.assign({}, bd, action.payload)
          } else return bd
        })
      return { ...state }
    default:
      return state;
  }
}

