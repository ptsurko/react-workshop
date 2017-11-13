////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMouse` a "higher-order component" that sends the mouse position
// to the component as props.
//
// Hint: use `event.clientX` and `event.clientY`
//
// Got extra time?
//
// Make a `withCat` HOC that shows a cat chasing the mouse around the screen!
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as styles from './styles'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName ||
         WrappedComponent.name ||
         'Component'
}

const withMouse = (Component) => {
  return class extends React.Component {
    static displayName = `WithMouse${getDisplayName(Component)}`

    state = { mouse: { x: 0, y: 0 } }

    componentDidMount() {
      this.el.addEventListener('mousemove', this.handleMouseMove)
    }

    componentWillUnmount() {
      this.el.removeEventListener('mousemove', this.handleMouseMove)
    }

    handleMouseMove = ({ x, y }) => {
      this.setState({
        mouse: {
          x,
          y
        }
      })
    }

    render() {
      return (
        <div ref={(el) => this.el = el}>
          <Component {...this.state} {...this.props}/>
        </div>
      )
    }
  }
}

class App extends React.Component {
  static propTypes = {
    mouse: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    const { mouse } = this.props

    return (
      <div style={styles.container}>
        {mouse ? (
          <h1>The mouse position is ({mouse.x}, {mouse.y})</h1>
        ) : (
          <h1>We don't know the mouse position yet :(</h1>
        )}
      </div>
    )
  }
}

const AppWithMouse = withMouse(App)

ReactDOM.render(<AppWithMouse/>, document.getElementById('app'))
