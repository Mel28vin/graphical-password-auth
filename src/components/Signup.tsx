import {
  Button,
  Card,
  Form,
  Alert,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const passwordConfirmRef = useRef<HTMLInputElement>()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [colorValue, setColorValue] = useState("0")
  const [imagePatternValue, setImagePatternValue] = useState("")
  const { signup } = useAuth()
  const navigate = useNavigate()

  const colors = [
    { name: "Red", value: "1", variant: "danger" },
    { name: "Green", value: "2", variant: "success" },
    { name: "Blue", value: "3", variant: "primary" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setImagePatternValue("")
      setLoading(false)
      return setError("Passwords Do Not Match")
    }
    if (imagePatternValue.length !== 12) {
      setImagePatternValue("")
      setLoading(false)
      return setError("Click every color once")
    }
    try {
      setError("")
      setLoading(true)
      const completePassword = passwordRef.current.value + imagePatternValue
      await signup(emailRef.current.value, completePassword)
      navigate("/")
    } catch {
      setError("Failed to create an Account")
    }
    setLoading(false)
    setImagePatternValue("")
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4 mono-font"> Sign Up</h2>
          {error && <Alert variant="danger"> {error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label> Email </Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label> Password </Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label> Password Confirmation </Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label> Image Pattern Password </Form.Label>
              <ButtonGroup className="d-flex align-items-center justify-content-center w-70">
                {colors.map((color, idx) => (
                  <ToggleButton
                    key={color.value}
                    id={`color-${idx}`}
                    type="radio"
                    variant={color.variant}
                    name={color.name}
                    value={color.value}
                    checked={colorValue === color.value}
                    onChange={(e) => {
                      setColorValue(e.currentTarget.value)
                      setImagePatternValue(
                        imagePatternValue + e.currentTarget.name
                      )
                    }}
                  >
                    {color.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
            <Button
              disabled={loading}
              variant="info"
              className="w-100 mt-4"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}

export default Signup