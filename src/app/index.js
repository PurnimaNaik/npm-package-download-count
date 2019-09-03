import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { render } from 'react-dom';
import style from '../styles/index.css';

class App extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      packageNameInState: '',
      startDate: new Date(),
      endDate: new Date(),
      responseInState: '',
      errorMessageInState:'',
    };
  }
  componentDidMount() {
    // this.retrieveCount();
  }

  retrieveCount() {
    var request = new XMLHttpRequest();
    // https://api.npmjs.org/downloads/point/2019-06-01:2019-09-30/two-part-progress-circle

    var formatedStartDate = this.formatDate(this.state.startDate);
    var formatedEndDate = this.formatDate(this.state.endDate);

    request.open(
      'GET',
      'https://api.npmjs.org/downloads/point/' +
        formatedStartDate +
        ':' +
        formatedEndDate +
        '/' +
        this.state.packageNameInState,
      true
    );
    request.onload = function() {
      var data = JSON.parse(request.response);

      if (request.readyState == 4 && request.status == 200) {
        this.oncallback(data);
      } else if (request.status != 200) {
        this.onNoResultCallback(data);
      }
    }.bind(this);
    request.send();
  }

  oncallback(response) {
    console.log('response');
    console.log(response);
    this.setState({
      responseInState: response,
    });
  }

  onNoResultCallback(response) {
    console.log('onNoResultCallback');
    console.log(response);
    this.setState({
      errorMessageInState: response.error,
    });
  }

  onSubmit(e) {
    // this.setState({
      // errorMessageInState:'',
      // responseInState:'',
      // packageNameInState: '',
      // startDate: new Date(),
      // endDate: new Date(),
    // },()=>{
    //   this.retrieveCount();
    // });
    this.retrieveCount();
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  setStartDate(date) {
    this.setState({
      startDate: date,
    });
  }

  setEndDate(date) {
    this.setState({
      endDate: date,
    });
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="contentContainer">
          <p className="heading"> NPM Package Download Count</p>
          <form className="npm-count-form">
            <input
              type="text"
              className="input"
              placeholder="enter package name"
              onChange={evt => {
                this.setState({ packageNameInState: evt.target.value,errorMessageInState:'',
                responseInState:'', });
              }}
            />
            <p className="dateRangeInstruction">Select date range</p>
            <div className="datePickerContainer">
              <>
                <DatePicker
                  className="firstDatePicker"
                  selectsStart
                  selected={this.state.startDate}
                  onChange={this.setStartDate.bind(this)}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  maxDate={new Date()}
                  isClearable
                />

                <DatePicker
                  selectsEnd
                  selected={this.state.endDate}
                  onChange={this.setEndDate.bind(this)}
                  endDate={this.state.endDate}
                  startDate={this.state.startDate}
                  minDate={this.state.startDate}
                  maxDate={new Date()}
                  isClearable
                />
              </>
            </div>
          </form>

          <div className="buttonContainer">
            <button
              className="button"
              onClick={this.onSubmit}
              variant="success"
              disabled={this.state.packageNameInState == ''}
              // disabled={false}
            >
              Get Count
            </button>
          </div>
{this.state.errorMessageInState!='' ?(
  <p className="error">Error : {this.state.errorMessageInState}.</p>
):null}


          {this.state.responseInState && this.state.errorMessageInState=='' && this.state.packageNameInState ? (
            <div className="resultsContainer">
              {/* <p>Results</p> */}

              {/* <p className="instruction">
              {this.state.responseInState.package} was downloaded
            </p> */}
              <p className="downloadCount">
                {this.state.responseInState.downloads}
              </p>
              <p className="instruction">downloads</p>

              {/* <p className="instruction">
              times from {this.state.startDate.toLocaleDateString()} to{' '}
              {this.state.endDate.toLocaleDateString()}
            </p> */}
            </div>
          ) : null}
        </div>
        <div className="disclaimerContainer">
          <p className="APIDisclaimer">
            * Website uses NPM's API to pull download count.
          </p>
        </div>
      </div>
    );
  }
}

render(<App />, window.document.getElementById('app'));
