const theme = localStorage.getItem("THEME") ? localStorage.getItem("THEME").replace(/"/g, "") : "light"

const themeReducer = (state = theme, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
               return state = state === "light" ? "dark" : "light";
      default: return state
  }
}

export default themeReducer