import { useRef, useState } from "react"
import {
  Button,
  Card,
  Form,
  Alert,
  ToggleButton,
  ButtonGroup,
} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"

let imagePattern: string[] = []

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const passwordConfirmRef = useRef<HTMLInputElement>()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [radioValue, setRadioValue] = useState("0")
  const { signup } = useAuth()

  const radios = [
    { name: "Red", value: "1", variant: "danger" },
    { name: "Green", value: "2", variant: "success" },
    { name: "Blue", value: "3", variant: "primary" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      imagePattern = []
      setLoading(false)
      return setError("Passwords Do Not Match")
    }
    const colorPatternString = imagePattern.join("")
    if (colorPatternString.length !== 12) {
      imagePattern = []
      setLoading(false)
      return setError("Click every color once")
    }
    try {
      setError("")
      setLoading(true)
      const completePassword = passwordRef.current.value + colorPatternString
      await signup(emailRef.current.value, completePassword)
    } catch {
      setError("Failed to create an Account")
    }
    setLoading(false)
    imagePattern = []
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Sign Up</h2>
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
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={radio.value}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={radio.variant}
                    name={radio.name}
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                      setRadioValue(e.currentTarget.value)
                      imagePattern.push(e.currentTarget.name)
                    }}
                  >
                    {radio.name}
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
        Already have an account? Log In
      </div>
    </>
  )
}

export default SignUp
