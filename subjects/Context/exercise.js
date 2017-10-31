/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const ENTER_KEY_CODE = 13

class Form extends React.Component {
  static childContextTypes = {
    submitForm: PropTypes.func
  }

  getChildContext() {
    return {
      submitForm: this.props.onSubmit
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    submitForm: PropTypes.func
  }

  render() {
    return <button onClick={() => this.context.submitForm()}>{this.props.children}</button>
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    submitForm: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      value: ''
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.context.submitForm({
        [this.props.name]: this.state.value
      })
    }
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyDown={this.handleKeyDown}
        onChange={this.handleInputChange}
        value={this.props.value}
      />
    )
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert('YOU WIN!')
  }

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
