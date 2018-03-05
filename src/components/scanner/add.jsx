import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Quagga from 'quagga'

class Dumb extends Component {
  componentDidMount() {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#hello'),
      },
      decoder: {
        readers: ['code_128_reader'],
      },
    }, (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('Initialization finished. Ready to start')
      Quagga.start()
    })

    Quagga.onDetected((result) => {
      console.log(result)
      Quagga.stop()
    })
  }

  render() {
    return (
      <div id='hello' />
    )
  }
}

export default Dumb
