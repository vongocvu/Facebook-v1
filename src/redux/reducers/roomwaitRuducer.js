const roomsWait = []

const roomWaitReducer = (state = roomsWait, action) => {
  switch (action.type) {
    case "ADD_ROOM_WAIT": 
                         return [...new Set([...state, action.payload])]
    case "DELETE_ROOM_WAIT": 
                          return [...new Set([...state.filter((room) => room._id !== action.payload._id)])]
     default: 
             return [...new Set([...state])]
  }
}

export default roomWaitReducer