// Usage
// const loading = combineLatest(fakeLoad(5000), preload(res).observable)
// subscription = loading.subscribe({
//   next(percents) {
//     // const percent = percents.reduce((a, b) => a + b) / percents.length
//     const percent = percents.reduce((a, b) => a * b) // smooth
//     console.log(`${Math.floor(percent*100)}%`)
//   },
//   complete() {
//     // next
//   },
// })
// // subscription.unsubscribe()

// TODO loadManager ref Threejs


export const combineLatest = (...observables) => {
  return new Observable(ob => {
    const { length } = observables

    const initializedSet = new Set
    const completedSet = new Set
    const values = Array.from({ length })

    const subscriptions = observables.map((observable, index) => {
      return observable.subscribe({
        next(v) {
          values[index] = v
          initializedSet.add(index)

          if (initializedSet.size === length) {
            ob.next(values)
          }
        },
        complete() {
          completedSet.add(index)

          if (completedSet.size === length) {
            ob.complete()
          }
        },
      })
    })

    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe())
    }
  })
}

export const fakeLoad = (duration) => {
  return new Observable(ob => {
    const startTime = Date.now()
    !function loop() {
      const percent = (Date.now() - startTime) / duration
      if (percent >= 1)  {
        ob.next(1)
        ob.complete()
      } else {
        ob.next(percent)
        setTimeout(loop, 30)
      }
    }()
  })
}


export const preload = (url) => {
  // TODO load before subscribe?
  const req = new XMLHttpRequest
  req.open('GET', url, true)
  req.responseType = 'blob'

  const out = {
    promise: new Promise(resolve => {
      req.addEventListener('load', () => {
        if (req.status === 200) {
          const blobURL = URL.createObjectURL(req.response)
          resolve(blobURL)
        }
      })
    }),
    observable: new Observable(ob => {
      req.addEventListener('progress', (evt) => {
        const total = evt.total || evt.target.getResponseHeader('Content-Length')
        const percent = evt.loaded / total
        ob.next(percent)
      })
      req.addEventListener('load', () => {
        ob.complete()
      })
    }),
  }

  req.send()
  return out
}
