import { Container } from "react-bootstrap"
import SignUp from "./SignUp"
import { AuthProvider } from "../contexts/AuthContext"

const App = () => {
  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <SignUp />
        </div>
      </Container>
    </AuthProvider>
  )
}

export default App
