import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Quagga from 'quagga'

class Dumb extends Component {
  componentDidMount() {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        width: 200,
        height: 200,
        aspectRatio: { min: 1, max: 2 },
        target: document.querySelector('#hello'),
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: ['code_128_reader'],
      },
      debug: {
        drawBoundingBox: false,
        showFrequency: false,
        drawScanline: false,
        showPattern: false,
      },
      locate: true,
    }, (err) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('Initialization finished. Ready to start')
      Quagga.start()
    })

    // Quagga.onProcessed((result) => {
    //   const drawingCtx = Quagga.canvas.ctx.overlay
    //   const drawingCanvas = Quagga.canvas.dom.overlay

    //   if (result) {
    //     if (result.boxes) {
    //       drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10),
    //         parseInt(drawingCanvas.getAttribute('height'), 10))
    //       result.boxes.filter(box => box !== result.box).forEach((box) => {
    //         Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx,
    //           { color: 'green', lineWidth: 2 })
    //       })
    //     }

    //     if (result.box) {
    //       Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx,
    //         { color: '#00F', lineWidth: 2 })
    //     }

    //     if (result.codeResult && result.codeResult.code) {
    //       Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx,
    //         { color: 'red', lineWidth: 3 })
    //     }
    //   }
    // })

    Quagga.onDetected((result) => {
      if (parseInt(result, 10)) {
        const img = document.getElementById('img')
        img.src = Quagga.canvas.dom.image.toDataURL()
        Quagga.stop()
      }
    })
  }

  render() {
    return (
      <div>
        <div id='hello' style={{ width: '100%' }} />
        <img id='img' alt='Barcode' />
      </div>
    )
  }
}

export default Dumb
