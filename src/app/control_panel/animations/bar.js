const barAnimations = {
  default : (duration, type, easing, indexAxis = 'y') => {
    return {
      duration: duration,
    }
  },
  from_start : (duration, type, easing, indexAxis = 'y', dataLength) => {
    const axis = indexAxis === 'y' ? 'x' : 'y'
    return {
      [indexAxis] : {
        duration : duration,
        type : type,
        easing : easing,
        from : (ctx) => -(ctx.element?.width) / 3
      },
      [axis]: {
        duration: 0
      }
    }
  },
  from_start_delayed : (duration, type, easing, indexAxis = 'y', dataLength) => {
    const axis = indexAxis === 'y' ? 'x' : 'y'
    const delayBetweenPoints = duration / dataLength
    let delayed
    return {
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * delayBetweenPoints
        }
        return delay;
      },
      
      [indexAxis] : {
        delay: 580,
        duration : delayBetweenPoints,
        type : type,
        easing : easing,
        from : (ctx) => -(ctx.element?.width) / 3
      },
      [axis] : {
        duration : 0,
        type : type,
      }
    }
  },
  
  from_start_growing : (duration, type, easing, indexAxis = 'y') => {
    const axis = indexAxis === 'y' ? 'x' : 'y'
    return {
      [indexAxis] : {
        duration : duration,
        type : type,
        easing : easing,
        from : (ctx) => -(ctx.element?.width) / 3
      },
      // [axis] : {
      //   duration: duration,
      //   from : (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1]?.getProps([axis], true)[axis],
      // }
    }
  },

  from_start_growing_delayed : (duration, type, easing, indexAxis = 'y', dataLength) => {
    const delayBetweenPoints = duration / dataLength
    const axis = indexAxis === 'y' ? 'x' : 'y'
    let delayed
    return {
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * delayBetweenPoints
        }
        return delay;
      },
      
      [indexAxis] : {
        duration : delayBetweenPoints,
        type : type,
        easing : easing,
        from : (ctx) => -(ctx.element?.width) / 3
      },
      // [axis] : {
      //   duration: duration,
      //   // from : (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1]?.getProps([axis], true)[axis],
      // }
    }
  },

}

export default barAnimations