import React, { Component } from 'react';
import './submitBtn.css'

class SubmitBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleOnClick = () => {
    console.log(this.props.mood, this.props.energy)  
  }

  render() {
    return(
      <div className="submitBtnWrapper">
        <button className="submitBtn" onClick={this.handleOnClick}>
          Moodify!
        </button>
      </div>
    );
  }
}

export default SubmitBtn;