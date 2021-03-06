////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time
import React from 'react'
import ReactDOM from 'react-dom'
import serializeForm from 'form-serialize'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      billingName: '',
      billingState: '',
      shippingName: '',
      shippingState: '',
      shippingSameAsBilling: false
    }

    this.handleBillingNameChange = this.handleBillingNameChange.bind(this)
    this.handleBillingStateChange = this.handleBillingStateChange.bind(this)
    this.handleShippingNameChange = this.handleShippingNameChange.bind(this)
    this.handleShippingStateChange = this.handleShippingStateChange.bind(this)
    this.handleSameAsBillingChange = this.handleSameAsBillingChange.bind(this)
  }

  handleSameAsBillingChange(event) {
    this.setState({
      shippingSameAsBilling: event.target.checked
    })
  }

  handleBillingNameChange(event) {
    this.setState({
      billingName: event.target.value
    })
  }

  handleBillingStateChange(event) {
    this.setState({
      billingState: event.target.value
    })
  }

  handleShippingNameChange(event) {
    this.setState({
      shippingName: event.target.value
    })
  }

  handleShippingStateChange(event) {
    this.setState({
      shippingState: event.target.value
    })
  }

  render() {
    const {
      shippingSameAsBilling,
      billingName,
      billingState,
      shippingName,
      shippingState
    } = this.state

    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>
                Billing Name:
                <input
                  type="text"
                  value={billingName}
                  onChange={this.handleBillingNameChange}/>
              </label>
            </p>
            <p>
              <label>
                Billing State:
                <input
                  type="text"
                  size="2"
                  value={billingState}
                  onChange={this.handleBillingStateChange}/>
              </label>
            </p>
          </fieldset>
          <br/>
          <fieldset>
            <label>
              <input
                type="checkbox"
                value={shippingSameAsBilling}
                onChange={this.handleSameAsBillingChange}/>
                Same as billing
              </label>
            <legend>Shipping Address</legend>
            <p>
              <label>
                Shipping Name:
                <input type="text"
                  value={shippingSameAsBilling ? billingName : shippingName}
                  disabled={shippingSameAsBilling ? 'disabled': ''}
                  onChange={this.handleShippingNameChange}/>
              </label>
            </p>
            <p>
              <label>
                Shipping State:
                <input
                  type="text"
                  size="2"
                  value={shippingSameAsBilling ? billingState : shippingState}
                  disabled={shippingSameAsBilling ? 'disabled': ''}
                  onChange={this.handleShippingStateChange}/>
              </label>
            </p>
          </fieldset>
          <p>
            <button>Submit</button>
          </p>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<CheckoutForm/>, document.getElementById('app'))
