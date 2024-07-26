const lineAnimations = {
  growing : (duration, type, easing, indexAxis = 'x') => {
    const axis = indexAxis === 'y' ? 'x' : 'y'
    return {
      duration: duration,
      [axis] : {
        type: type,
        easing: easing,
        from : (ctx) => indexAxis === 'x' ? ctx.chart.height : 0
      }
    }
},
from_start : (duration, type, easing, indexAxis = 'x') => {
  const axis = indexAxis === 'y' ? 'x' : 'y'
  return {
    [indexAxis] : {
      duration : duration,
      type : type,
      easing : easing,
      from : (ctx) => 0
    },
    [axis] : {
      duration : 0,
      type : type
    }
  }
},
from_start_growing : (duration, type, easing, indexAxis = 'x') => {
  return {
    [indexAxis] : {
        duration : duration,
        type : type,
        easing : easing,
        from : (ctx) => 0
      }
    }
  },
  moving_forward : (duration, type, easing, indexAxis = 'x', dataLength) => {
    const axis = indexAxis === 'y' ? 'x' : 'y'
    const delayBetweenPoints = duration / dataLength
    const previous = (ctx) => ctx.index === 0 ? ctx.chart.scales[axis].getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1]?.getProps([axis], true)[axis];
    return {
      [indexAxis]: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN,
        delay: (ctx) => ctx.index * delayBetweenPoints
      },
      [axis]: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previous,
        delay(ctx) {
          return ctx.index * delayBetweenPoints;
          }
        }
      }
    }
}

export default lineAnimations