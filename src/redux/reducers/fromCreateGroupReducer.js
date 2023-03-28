const CreateGroup = false;

const fromCreateGroupReducer = ( state = CreateGroup, action) => {
  switch (action.type) {
    case "ON": return true
    case "OFF": return false
    default: return false
  }
}


export default fromCreateGroupReducer