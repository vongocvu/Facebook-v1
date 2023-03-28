const FormOn = ""

const onOffForm = (state = FormOn, action) => {
  switch (action.type) {
    case 'ON-FORM':
      return action.payload
    case 'OFF-FORM':
      return ""
    default: return state
  }
}

export default onOffForm