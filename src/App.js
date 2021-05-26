import "./App.css";
import React from "react";
import { v4 as uuid4 } from "uuid";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      total_balance: 0,
      total_income: 0,
      total_expense: 0,
      temp_text: "",
      temp_amount: "",
      temp_date: "",
    };
  }
  temptext = (e) => {
    this.setState({
      temp_text: e.target.value,
    });
  };
  tempamount = (e) => {
    this.setState({
      temp_amount: e.target.value,
    });
  };
  tempdate = (e) => {
    this.setState({
      temp_date: e.target.value,
    });
  };
  add = (index) => {
    const transactions = Object.assign([], this.state.transactions);
    /*if (Number.isInteger(parseInt(this.state.temp_amount[0]))) {
      var temp = this.state.temp_amount;
      this.setState({ temp_amount: "+" + temp });
      console.log(this.state.temp_amount);
    }*/
    const temp_trans = {
      id: uuid4(),
      text: this.state.temp_text,
      amount: this.state.temp_amount,
      date: this.state.temp_date,
    };

    //console.log(this.state.temp_amount[0]);
    //console.log(typeof parseInt(this.state.temp_amount.slice(1)));
    var amount = parseInt(this.state.temp_amount.slice(1));
    if (this.state.temp_amount[0] === "+") {
      this.setState({
        total_income: this.state.total_income + amount,
        total_balance: this.state.total_balance + amount,
      });
    } else if (this.state.temp_amount[0] === "-") {
      this.setState({
        total_expense: this.state.total_expense - amount,
        total_balance: this.state.total_balance - amount,
      });
    } else if (Number.isInteger(parseInt(this.state.temp_amount[0]))) {
      var amount1 = parseInt(this.state.temp_amount);
      this.setState({
        total_income: this.state.total_income + amount1,
        total_balance: this.state.total_balance + amount1,
      });
      temp_trans.amount = "+" + this.state.temp_amount;
    } else {
      alert("wrong input");
    }
    this.setState({
      transactions: [...transactions, temp_trans],
    });
  };
  delete = (index, e) => {
    const t1 = Object.assign([], this.state.transactions);
    //console.log(index.target.value);
    t1.splice(index.target.value, 1);
    this.setState({
      transactions: t1,
    });
  };
  render() {
    console.log(this.state.transactions);
    return (
      <div>
        <h1>Expense Tracker(using Tracker)</h1>
        <h2>Your balance is : &#8377; {this.state.total_balance}</h2>
        <p>
          Income : &#8377; +{this.state.total_income} Expense : &#8377;
          {this.state.total_expense}
        </p>
        <h3>History</h3>
        <ul>
          {this.state.transactions.map((transaction, index) => (
            <div>
              <li>
                <p>
                  {transaction.text} --- {transaction.amount}
                  <button onClick={this.delete} value={index}>
                    delete
                  </button>
                </p>
              </li>
            </div>
          ))}
        </ul>
        <h3>Add new transaction</h3>
        <p>
          Text : <input placeholder="Enter text..." onChange={this.temptext} />
        </p>
        <p>
          Amount(negative - expense , positive - income) :
          <input placeholder="Enter amount..." onChange={this.tempamount} />
        </p>
        <p>
          Select Date : <input type="date" onChange={this.tempdate} />
        </p>
        <button onClick={this.add}>Add transaction</button>
      </div>
    );
  }
}

export default App;
