// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentsLists, isStartedItem} = props
  const {id, name, date, isStarted} = appointmentsLists

  const onClickButton = () => {
    isStartedItem(id)
  }

  const starImage = isStarted
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  return (
    <li className="appointmentItem">
      <div className="itemTextContainer">
        <p className="itemTitle">{name}</p>
        <p className="itemDate">{formatedDate}</p>
      </div>
      <button onClick={onClickButton} type="button" className="starButton">
        <img alt="star" className="itemStart" src={starImage} />
      </button>
    </li>
  )
}

export default AppointmentItem
