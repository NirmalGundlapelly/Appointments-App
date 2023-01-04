// Write your code here
import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointmentsList: [], name: '', date: '', filterActive: false}

  activateFilter = () => {
    const {filterActive} = this.state
    this.setState({filterActive: !filterActive})
  }

  getStartedAppointments = () => {
    const {appointmentsList, filterActive} = this.state

    if (filterActive) {
      return appointmentsList.filter(eachItem => eachItem.isStarted === true)
    }
    return appointmentsList
  }

  isStartedItem = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarted: !eachItem.isStarted}
        }
        return eachItem
      }),
    }))
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {appointmentsList, name, date} = this.state
    const newAppointment = {
      id: uuid(),
      name,
      date,
      isStarted: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      name: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({name: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointmentsList, name, date} = this.state
    const {isStarted} = appointmentsList
    const finalResults = this.getStartedAppointments()

    return (
      <div className="appContainer">
        <div className="contentContainer">
          <h1 className="heading">Add Appointment</h1>
          <div className="formContainer">
            <form className="form">
              <label className="labels" htmlFor="title">
                TITLE
              </label>
              <input
                value={name}
                onChange={this.onChangeTitle}
                placeholder="Title"
                className="inputs"
                id="title"
              />

              <label className="labels" htmlFor="date">
                DATE
              </label>
              <input
                value={date}
                onChange={this.onChangeDate}
                className="inputs"
                id="date"
                type="date"
              />
              <button
                onClick={this.onClickSubmit}
                type="submit"
                className="addButton"
              >
                Add
              </button>
            </form>
            <img
              className="appointmentImage"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <hr />
          <div className="appointmentsContainer">
            <div className="textStarContainer">
              <h1 className="heading appointmentText">Appointments</h1>
              <button
                onClick={this.activateFilter}
                type="button"
                className="startedButton"
              >
                Starred
              </button>
            </div>
            <ul className="appointmentsItemContainer">
              {finalResults.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  isStartedItem={this.isStartedItem}
                  appointmentsLists={eachItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
