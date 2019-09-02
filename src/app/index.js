
import React from 'react';
import {render} from 'react-dom';

class App extends React.Component{

    constructor(){
        super();
        this.state={
            packageName:"",
            startDate:"",
            endDate:""
        };
    }
 
    componentDidMount(){
        // this.retrieveCount();
    }

    retrieveCount(){
        var request = new XMLHttpRequest();
        // https://api.npmjs.org/downloads/point/2019-06-01:2019-09-30/two-part-progress-circle
        request.open('GET', 'https://api.npmjs.org/downloads/point/2019-06-01:2019-09-30/two-part-progress-circle', true);
        request.onload = function () {
          var data = JSON.parse(request.response);

          if (request.readyState == 4 && request.status == 200){
            this.oncallback(data);
          }
          else if(request.readyState == 4 && request.status == 404){
            this.onNoResultCallback();
          }
        }.bind(this);
        request.send();
      }
    
      oncallback(newData){
        console.log("newData");
        console.log(newData);
      }

      onNoResultCallback(){
        console.log("onNoResultCallback");
      }

    render(){
        return(
            <div>
            <h1>hello</h1>
            </div>
        )
    }
}

render (<App/>, window.document.getElementById("app"));