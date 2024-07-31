const barAnimations = {
  growing : (duration, type, easing, indexAxis = 'x') => {
    return {
      duration: duration,
    }
  },
  delayed_growing : (duration, type, easing, indexAxis = 'x', dataLength) => {
    const delayBetweenPoints = duration / dataLength
    return {
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
          delay = context.dataIndex * delayBetweenPoints
        }
        return delay;
      },
      duration: duration,
    }
  },
  from_start : (duration, type, easing, indexAxis = 'x', dataLength) => {
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
  from_start_delayed : (duration, type, easing, indexAxis = 'x', dataLength) => {
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
        from : (ctx) => -(ctx.element?.width) / 2
      },
      [axis] : {
        duration : 0,
        type : type,
      }
    }
  },
  
  from_start_growing : (duration, type, easing, indexAxis = 'x') => {
    return {
      [indexAxis] : {
        duration : duration,
        type : type,
        easing : easing,
        from : (ctx) => -(ctx.element?.width) / 3
      }
    }
  },

  from_start_growing_delayed : (duration, type, easing, indexAxis = 'x', dataLength) => {
    const delayBetweenPoints = duration / dataLength
    return {
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
          delay = context.dataIndex * delayBetweenPoints
        }
        return delay;
      },
      
      [indexAxis] : {
        duration : delayBetweenPoints,
        type : type,
        easing : easing,
        from : (ctx) => -(ctx.element?.width) / 3
      }
    }
  },

}

export default barAnimations