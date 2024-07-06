import { createContext, useState } from "react"

const AppContext = createContext()

function ContextProvider({ children }) {
  const [user, setUser] = useState(null)

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}

export { AppContext, ContextProvider }
