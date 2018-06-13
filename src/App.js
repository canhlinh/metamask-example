import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import { FormGroup, Panel, FormControl, Col, Form, Button } from 'react-bootstrap';


var web3 = undefined;

function initWeb3() {
  if(typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);  
  } else {
    alert("Please install metamask")
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isConnected: false};
    initWeb3()
    this.state = {
      toAddress: '',
      etherQuantity: 10,
    };
  }

  componentWillMount() {
    if(this.web3 && this.web3.isConnected()) {
      this.setState({isConnected: true});
      if(this.web3.net.listening) {
        this.setState({peers: this.web3.net.peerCount});
      }
      this.setState({version: this.web3.version.node})
    }
  }

  updateAddress(evt) {
    this.setState({
      toAddress: evt.target.value
    });
  }

  updateQuantity(evt) {
    this.setState({
      etherQuantity: evt.target.value
    });
  }
  
  onClickBuyButton() {
    var sender = web3.eth.accounts[0];
    var value = web3.toWei(this.state.etherQuantity);
    var toAddress = this.state.toAddress;

    if (value === 0 ){
      alert("Quantity can not be zero");
      return;
    }

    if (toAddress === "") {
      alert("Address can not be zero");
      return;
    }

    if (sender === null || sender === undefined) {
      alert("Please login metamask");
      return 
    }


    web3.eth.sendTransaction({
      from: sender,
      value: this.state.etherQuantity,
      to: this.state.toAddress,
      data: '0x',
    },(err, res) => {
      console.log(err, res);
    })
  }



  render() {
    return (
    <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>

        <Panel>
        <Panel.Heading>Send ether to an address</Panel.Heading>
          <Panel.Body>
            <Form horizontal>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={10}>
                  <FormControl type="number" placeholder="Value" value={this.state.etherQuantity} onChange={evt => this.updateQuantity(evt)}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <Col sm={10}>
                  <FormControl type="text" placeholder="To address" value={this.state.toAddress} onChange={evt => this.updateAddress(evt)}/>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button bsStyle="primary" bsSize="large"  onClick={() => this.onClickBuyButton()}>Send</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default App;
