import { Button, Card, Form, Alert, ButtonGroup } from "react-bootstrap"
import {
  GiCardAceHearts,
  GiCardKingHearts,
  GiCardQueenHearts,
  GiCardJackHearts,
} from "react-icons/gi"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Tooltip from "./Tooltip"
import "../button.css"

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const passwordConfirmRef = useRef<HTMLInputElement>()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [imagePatternValue, setImagePatternValue] = useState("")
  const [clicks, setClicks] = useState(0)
  const { signup } = useAuth()
  const navigate = useNavigate()
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{6,})/

  const images = [
    {
      name: "AceHearts",
      icon: <GiCardAceHearts size={36} />,
      value: "1",
      variant: "custom",
    },
    {
      name: "JackHearts",
      icon: <GiCardJackHearts size={36} />,
      value: "2",
      variant: "custom",
    },
    {
      name: "KingHearts",
      icon: <GiCardKingHearts size={36} />,
      value: "3",
      variant: "custom",
    },
    {
      name: "QueenHearts",
      icon: <GiCardQueenHearts size={36} />,
      value: "4",
      variant: "custom",
    },
  ]

  const shuffle = (inputArray: any[]) => {
    const array = inputArray
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  const [shuffledCards] = useState(shuffle(images))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setLoading(false)
      return setError("Passwords Do Not Match")
    }
    if (!passwordRegex.test(passwordRef.current.value)) {
      setLoading(false)
      return setError("Weak Password")
    }
    if (clicks !== 4) {
      setImagePatternValue("")
      setClicks(0)
      setLoading(false)
      return setError("Click only four images(Repetition Allowed)")
    }
    try {
      setError("")
      setLoading(true)
      setClicks(0)
      const completePassword = passwordRef.current.value + imagePatternValue
      await signup(emailRef.current.value, completePassword)
      navigate(`${process.env.REACT_APP_PUBLIC_URL}/`)
    } catch {
      setClicks(0)
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
            <Form.Group id="image-pattern-password">
              <Form.Label className="d-flex align-items-center">
                <div>Image Pattern Password </div>
                <Tooltip />
              </Form.Label>
              <ButtonGroup className="d-flex align-items-center justify-content-center w-70">
                {shuffledCards.map((image, idx) => (
                  <Button
                    key={image.value}
                    id={`image-${idx}`}
                    variant={image.variant}
                    name={image.name}
                    value={image.value}
                    className="custom-bg"
                    onClick={(e) => {
                      setClicks(clicks + 1)
                      setImagePatternValue(
                        imagePatternValue + e.currentTarget.name
                      )
                    }}
                  >
                    {image.icon}
                  </Button>
                ))}
              </ButtonGroup>
            </Form.Group>
            <Button
              disabled={loading}
              variant="info"
              className="w-100 mt-3"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?{" "}
        <Link to={`${process.env.REACT_APP_PUBLIC_URL}/login`}>Log In</Link>
      </div>
    </>
  )
}

export default Signup
