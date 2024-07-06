import { createContext, useState } from "react"

const AppContext = createContext()

function ContextProvider({ children }) {
  const [user, innerSetUser] = useState(JSON.parse(localStorage.getItem("user")))
  const setUser = (val) => {
    localStorage.setItem("user", JSON.stringify(val))
    innerSetUser(val)
  }

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}

export { AppContext, ContextProvider }
