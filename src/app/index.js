import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { render } from 'react-dom';



class App extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      packageNameInState: '',
      startDate: new Date(),
      endDate: new Date(),
      response:"",
    };
  }
  componentDidMount() {
    // this.retrieveCount();
  }

  retrieveCount() {
    var request = new XMLHttpRequest();
    // https://api.npmjs.org/downloads/point/2019-06-01:2019-09-30/two-part-progress-circle


    var formatedStartDate= this.formatDate(this.state.startDate);
    var formatedEndDate= this.formatDate(this.state.endDate);

    request.open(
      'GET',
      'https://api.npmjs.org/downloads/point/'+formatedStartDate+':'+formatedEndDate+'/'+this.state.packageNameInState,
      true
    );
    request.onload = function() {
      var data = JSON.parse(request.response);

      if (request.readyState == 4 && request.status == 200) {
        this.oncallback(data);
      } else if (request.readyState == 4 && request.status == 404) {
        this.onNoResultCallback();
      }
    }.bind(this);
    request.send();
  }

  oncallback(response) {
    console.log('response');
    console.log(response);
    this.setState({
        responseInState:response,
    })
  }

  onNoResultCallback() {
    console.log('onNoResultCallback');
  }

  onSubmit(e) {
    console.log("this.state.packageNameInState");
    console.log(this.state.packageNameInState);
    console.log(this.state.startDate);
    console.log(this.state.endDate);
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
      <div>
        <h1>hello</h1>
        <form className="npm-count-form">

        <input type="text" className="form-control" placeholder="package name" onChange={(evt) => {this.setState({ packageNameInState:evt.target.value }); }} />
        
        <h4>Select start date</h4> <h4>Select end date</h4>
        <>
        <DatePicker
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
        </form>

        <button type="button" onClick={this.onSubmit} className="btn">Get Count</button>

{this.state.responseInState?
<div>
<h3>Results</h3>
        <h3>{this.state.responseInState.downloads}</h3>
        <h3>{this.state.responseInState.start}</h3>
        <h3>{this.state.responseInState.end}</h3>
        <h3>{this.state.responseInState.package}</h3>
</div>
:
null}



      </div>
    );
  }
}

render(<App />, window.document.getElementById('app'));


// {downloads: 18, start: "2019-08-05", end: "2019-09-01", package: "two-part-progress-circle"}