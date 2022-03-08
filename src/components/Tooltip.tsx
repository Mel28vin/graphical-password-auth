import { BsInfoCircleFill } from "react-icons/bs"
import { Popover, OverlayTrigger, Button } from "react-bootstrap"
import "../button.css"

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3"> Help </Popover.Header>
    <Popover.Body>
      Press any four images (Repetition is allowed) for your Pattern Password.
      Example: [Ace, Queen, Ace, King]
    </Popover.Body>
  </Popover>
)

const Tooltip = () => (
  <OverlayTrigger placement="right" overlay={popover}>
    <Button
      variant="custom"
      style={{ padding: 0, margin: 0, marginLeft: 5 }}
      className="custom-bg"
    >
      <BsInfoCircleFill />
    </Button>
  </OverlayTrigger>
)

export default Tooltip
