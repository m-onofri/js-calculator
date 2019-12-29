import React from 'react';
import './App.css';
import Button from './components/Button.js';
import Display from './components/Display.js';

const valueButtons = [
  {id: "seven", value: "7", class:"number"},
  {id: "eight", value: "8", class:"number"},
  {id: "nine", value: "9", class:"number"},
  {id: "four", value: "4", class:"number"},
  {id: "five", value: "5", class:"number"},
  {id: "six", value: "6", class:"number"},
  {id: "one", value: "1", class:"number"},
  {id: "two", value: "2", class:"number"},
  {id: "three", value: "3", class:"number"},
  {id: "zero", value: "0", class:"number"}
];

const operationButtons = [
  {id: "divide", value: "/", class:"operator"},
  {id: "multiply", value: "*", class:"operator"},
  {id: "subtract", value: "-", class:"operator"},
  {id: "add", value: "+", class:"operator"}
];

class App extends React.Component {
  state = {
    expression: [],
    result: 0,
    prevResult: [],
    prevSign: ""
  }

  maxValWarning = () => {
    this.setState({
      result: 'Digit Limit Met'
    });
  }

  handleNumber = (e) => {
    const value = e.target.textContent;
    const expression = this.state.expression;
    const prevResult = this.state.prevResult;
    const prevSign = this.state.prevSign;
    if(expression.length > 13) {
      this.maxValWarning();
    } else if (prevSign === "=") {
      this.setState({
        expression: [value],
        result: 0,
        prevResult: [...prevResult],
        prevSign: ""
      });      
    } else if(value === "0" && expression.length === 1 && expression[0] === "0") {
        this.setState({
        expression: [...expression],
        result: [...prevResult].join(''),
        prevResult: [...prevResult],
        prevSign: this.state.prevSign === "." ? "." : ""
      }); 
    } else {
      this.setState({
        expression: [...expression, value],
        result: [...prevResult, value].join(''),
        prevResult: [...prevResult, value],
        prevSign: this.state.prevSign === "." ? "." : ""
      });
    }
  }
  
  handleSigns = (e) => {
    const sign = e.target.textContent;
    const expression = [...this.state.expression];
    const prevResult = this.state.prevResult;
      if ( expression[expression.length - 1] === "-" && expression[expression.length - 2].match(/[//+*-]/)) {
      this.setState({
        expression: [...expression.slice(0, -2), sign],
        result: sign,
        prevResult: [],
        prevSign: sign
      });
    } else if (this.state.prevSign.match(/[//+*]/)) {
      if (sign !== "-"){
        expression.pop();
      }
      this.setState({
        expression: [...expression, sign],
        result: sign,
        prevResult: [],
        prevSign: sign
      });
    } else if (this.state.prevSign === "=") {
      this.setState({
        expression: [...prevResult, sign],
        result: sign,
        prevResult: [],
        prevSign: sign
      }); 
    } else {
     this.setState({
        expression: [...expression, sign],
        result: sign,
        prevResult: [],
        prevSign: sign
      }); 
    }
  }
  
  handleEqualsSign = (e) => {
    const value = e.target.textContent;
    const result = this.calculateResult();
    this.setState({
      expression: [...this.state.expression, "="],
      result: result,
      prevResult: [result],
      prevSign: value
    });
  }
  
  handleDecimalSign = (e) => {
    const sign = e.target.textContent;
    const prevResult = this.state.prevResult;
    const temporaryValue = prevResult.length === 0 ? ["0", sign] : [...prevResult, sign];
    if(this.state.prevSign !== ".") {
      this.setState({
        expression: [...this.state.expression, sign],
        result: temporaryValue.join(''),
        prevResult: temporaryValue,
        prevSign: sign
      }); 
    }
  }
  
  handleClearSign = (e) => {
    this.setState({
           expression: [],
           result: 0,
           prevResult: [],
           prevSign: ""
         });
  }
  
  calculateResult = () => {
    const string = this.state.expression.join('');
    let correctString = string.replace("--", "+");
    return eval(correctString);
  }
  
   handleChangeSign = (e) => {
    const prevResult = this.state.prevResult;
    const expression = this.state.expression;
    const firstVal = prevResult[0];
    const newExpression = firstVal === "-" ? expression.slice(1) : ["-", ...this.state.expression];
    const newPrevResult = firstVal === "-" ? prevResult.slice(1) : ["-", ...this.state.prevResult];
    this.setState({
      expression: newExpression,
      result: newPrevResult.join(''),
      prevResult: newPrevResult
    });
   }
  
  render() {
    return (
      <div id="container">
        <Display 
          expression={this.state.expression} 
          result={this.state.result}/>
        {valueButtons.map( button => <Button 
                                       id={button.id}
                                       handleChange={this.handleNumber}
                                       value={button.value}
                                       view={button.class} />)}
        {operationButtons.map( button => <Button 
                                           id={button.id}
                                           handleChange={this.handleSigns}
                                           value={button.value}
                                           view={button.class} />)}
        
        <Button 
          id="decimal" 
          handleChange={this.handleDecimalSign} 
          value="." 
          view="number" />
        <Button 
          id="equals" 
          handleChange={this.handleEqualsSign} 
          value="=" 
          view="equals" />
        <Button 
          id="clear" 
          handleChange={this.handleClearSign} 
          value="C" 
          view="specialOperator" />
        <Button 
          id="percentage" 
          handleChange={this.makeSpecialOperation} 
          value="%" 
          view="specialOperator" />
      </div>
    );
  }
}


export default App;
