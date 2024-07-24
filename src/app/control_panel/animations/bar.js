const barAnimations = {
  default : (duration, type, easing, indexAxis = 'y') => {
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
  from_start : (duration, type, easing, indexAxis = 'y') => {
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
        duration : delayBetweenPoints,
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
  
  from_start_growing : (duration, type, easing, indexAxis = 'y') => {
    return {
      
      [indexAxis] : {
        duration : duration,
        type : type,
        easing : easing,
        from : (ctx) => 0
      }
    }
  },

  from_start_growing_delayed : (duration, type, easing, indexAxis = 'y', dataLength) => {
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
        duration : delayBetweenPoints,
        type : type,
        easing : easing,
        from : (ctx) => 0
      }
    }
  },

}

export default barAnimations