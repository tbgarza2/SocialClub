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
      phones: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleDateTime = this.handleDateTime.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSummary = this.handleSummary.bind(this);
    this.sendTwilio = this.sendTwilio.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.addPhone = this.addPhone.bind(this);
    this.removePhone = this.removePhone.bind(this);
  }

  handleSubmit() {
    console.log('clicked');
    const { phones } = this.state;
    if (phones.length) {
      phones.forEach(phone => this.sendTwilio(phone));
    }
    const { name, address, date, category, summary } = this.state;
    axios({
      method: 'post',
      url: 'api/event/events',
      data: {
        name: name,
        address: address,
        date: date,
        category: category,
        summary: summary,
        creator: this.props.currentUser,
        roomID: name,
      }
    });

    axios({
      method: 'post',
      url: 'api/chatkit/rooms',
      data: {
        id: name,
        creatorId: this.props.googleUser.profileObj.email,
        name: name,
      }
    });
  }

  sendTwilio(phone) {
    const message = {
      to: `+1${phone}`,
      body: 'lollipop',
    };

    fetch('/api/twilio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then(res => res.json());
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

  handlePhone(e, index) {
    const { phones } = this.state;
    phones[index] = e.target.value;
    this.setState({ phones });
  }

  addPhone() {
    const { phones } = this.state;
    this.setState({ phones: [...phones, ''] });
  }

  removePhone(e, index) {
    const { phones } = this.state;

    phones.splice(index, 1);

    this.setState({ phones: [...phones] });
  }

  render() {
    const { name, address, date, category, summary, phones } = this.state;
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

                    {
                      phones.map((phone, index) => (
                        <div className="form-group" key={index}>
                          <label className="col-md-4 control-label" htmlFor="to">Enter phone</label>
                          <div className="col-md-4">
                            <input style={{ borderRadius: 4 }} placeholder="(555) 555-5555" type="tel" name="to" id={index} value={phone} onChange={(e) => this.handlePhone(e, index)} />
                            <button id="removephonebutton" name="removephonebutton" type="button" className="btn btn-danger btn-sm" onClick={(e) => this.removePhone(e, index)}>X</button>
                          </div>
                        </div>
                      ))
                    }

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="phonebutton"></label>
                        <div className="col-md-4">
                            <button id="phonebutton" name="phonebutton" className="btn btn-secondary" type="button" onClick={this.addPhone}>Invite friends</button>
                          </div>
                      </div>

                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="singlebutton"></label>
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
