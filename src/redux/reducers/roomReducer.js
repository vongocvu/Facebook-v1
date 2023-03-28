const RoomsChating = []

const roomReducer = ( state = RoomsChating , action) => {
  switch (action.type) {
    case "ADD_ROOM": 
                    return [...new Set([...state, action.payload])]
    case "DELETE_ROOM": 
                    return [...new Set([...state.filter((room) => room !== action.payload)])]
    case "RESET_ROOM":
                    return []
    default: 
                return [...new Set([...state])]
  }
}

export default roomReducer