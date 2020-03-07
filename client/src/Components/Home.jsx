import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MapContainer from './MapContainer';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      button: {
        position: 'absolute',
        top: '50px',
      },
    };
    const { userId, viewSummary } = this.props;
    return (
      <div>
        <MapContainer viewSummary={viewSummary} userId={userId} />
        <Link to="/createevent">
          <button type="button" className="btn btn-primary" style={styles.button}>Create an event!</button>
        </Link>
      </div>
    );
  }
}
export default Home;
