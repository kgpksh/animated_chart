const polarAnimations = {
    default : (duration, type, easing, indexAxis = 'y') => {
        return {
          duration: duration,
          type : type,
          easing : easing,
        }
    },
    delay : (duration, type, easing, indexAxis = 'y', dataLength) => {
      const delayBetweenPoints = duration / dataLength
      return {
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default') {
            delay = context.dataIndex * delayBetweenPoints
          }
          return delay;
        },
        type : type,
        easing : easing,
      }
  },
  flying_from_away : (duration, type, easing, indexAxis = 'y', dataLength) => {
    const delayBetweenPoints = duration / dataLength
    return {
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
          delay = context.dataIndex * delayBetweenPoints
        }
        return delay;
      },
      x: {
        from : 0,
      },
      y: {
        from : 0
      },
      type : type,
      easing : easing,
    }
  }
}

export default polarAnimations