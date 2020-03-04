import React from 'react';
import axios from 'axios';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentUser: 'test',
      name: '',
      address: '',
      date: '',
      category: '',
      summary: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleDateTime = this.handleDateTime.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSummary = this.handleSummary.bind(this);
  }

  handleSubmit() {
    const {
      name, address, date, category, summary,
    } = this.state;
    axios({
      method: 'post',
      url: 'api/event/events',
      data: {
        name,
        address,
        date,
        category,
        summary,
        creator: this.props.currentUser,
        roomID: name,
      },
    });

  //   axios({
  //     method: 'post',
  //     url: 'api/chatkit/rooms',
  //     data: {
  //       id: name,
  //       creatorId: this.props.googleUser.profileObj.email,
  //       name,
  //     },
  //   });
  }


  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleAddress(event) {
    this.setState({ address: event.target.value });
  }

  handleDateTime(event) {
    this.setState({ date: event.target.value });
  }

  handleCategory(event) {
    this.setState({ category: event.target.value });
  }

  handleSummary(event) {
    this.setState({ summary: event.target.value });
  }

  render() {
    const {
      name, address, date, category, summary,
    } = this.state;
    return (
      <div>
        <form className="form-horizontal">
          <fieldset>


            <legend>Create Event:</legend>


            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="eventname">Event Name</label>
              <div className="col-md-4">
                <input id="eventname" name="eventname" type="text" value={name} onChange={this.handleName} placeholder="" className="form-control input-md" required="" />

              </div>
            </div>


            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="address">Address</label>
              <div className="col-md-4">
                <input id="address" name="address" type="text" value={address} onChange={this.handleAddress} placeholder="" className="form-control input-md" required="" />

              </div>
            </div>


            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="datetime">Date &amp; Time</label>
              <div className="col-md-4">
                <input id="datetime" name="datetime" type="datetime-local" value={date} onChange={this.handleDateTime} placeholder="" className="form-control input-md" required="" />

              </div>
            </div>


            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="category">Category</label>
              <div className="col-md-4">
                <select id="category" name="category" value={category} onChange={this.handleCategory} className="form-control">
                  <option value="-">-</option>
                  <option value="Social">Social</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Food">Food</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>


            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="summary">Summary</label>
              <div className="col-md-4">
                <textarea className="form-control" id="summary" name="summary" value={summary} onChange={this.handleSummary}>A short description of your event!</textarea>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="singlebutton" />
              <div className="col-md-4">
                <button id="singlebutton" name="singlebutton" className="btn btn-primary" type="button" onClick={this.handleSubmit}>Sumbit</button>
              </div>
            </div>

          </fieldset>
        </form>

      </div>
    );
  }
}

export default CreateEvent;
