import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import Dashboard from "./Dashboard"
import Signup from "./Signup"
import Login from "./Login"
import RequireUser from "./RequireUser"

const App = () => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h1 className="mono-font text-center"> AICTE </h1>
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path={`${process.env.REACT_APP_PUBLIC_URL}/`}
                element={
                  <RequireUser
                    redirectTo={`${process.env.REACT_APP_PUBLIC_URL}/login`}
                  >
                    <Dashboard />
                  </RequireUser>
                }
              />
              <Route
                path={`${process.env.REACT_APP_PUBLIC_URL}/signup`}
                element={<Signup />}
              />
              <Route
                path={`${process.env.REACT_APP_PUBLIC_URL}/login`}
                element={<Login />}
              />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
