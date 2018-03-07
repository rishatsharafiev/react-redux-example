import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Quagga from 'quagga'

class Dumb extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { handleChange } = this.props
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          width: { min: 160, max: 240 },
          height: { min: 120, max: 200 },
          facingMode: 'environment',
          aspectRatio: { min: 1, max: 2 },
          target: this._barcode128,
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 8,
        frequency: 10,
        decoder: {
          readers: [{
            format: 'code_128_reader',
            config: {},
          }],
        },
        locate: true,
      }, (err) => {
        if (err) {
          handleChange({ type: 'ERROR', payload: { error: err } })
          Quagga.stop()
          return
        }
        handleChange({ type: 'READY' })
        Quagga.start()
      })

      Quagga.onProcessed((result) => {
        const drawingCtx = Quagga.canvas.ctx.overlay
        const drawingCanvas = Quagga.canvas.dom.overlay
        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0, 0, parseInt(drawingCanvas.getAttribute('width'), 10),
              parseInt(drawingCanvas.getAttribute('height'), 10),
            )
            result.boxes.filter(box => box !== result.box).forEach((box) => {
              Quagga.ImageDebug.drawPath(
                box, { x: 0, y: 1 }, drawingCtx,
                { color: 'green', lineWidth: 2 },
              )
            })
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(
              result.box, { x: 0, y: 1 }, drawingCtx,
              { color: '#00F', lineWidth: 2 },
            )
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
              result.line, { x: 'x', y: 'y' }, drawingCtx,
              { color: 'red', lineWidth: 3 },
            )
          }
        }
      })

      Quagga.onDetected((result) => {
        const {
          codeResult: {
            code,
          },
        } = result
        if (parseInt(code, 10) && code.length === 10) {
          handleChange({ type: 'RESULT', payload: { code } })
          // Quagga.stop()
        }
      })
    } else {
      handleChange({ type: 'ERROR', payload: { message: 'Устройство не поддерживается' } })
    }
  }

  componentWillUnmount() {
    Quagga.stop()
  }

  getBarcode128Ref = (node) => { this._barcode128 = node }

  render() {
    return (
      <div className='barcode128' ref={this.getBarcode128Ref} />
    )
  }
}

export default Dumb
