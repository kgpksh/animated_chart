const donutAnimations = {
  default : (duration, type, easing, indexAxis = 'x') => {
    return {
      duration: duration,
      type : type,
      easing : easing,
    }
  },
  delayed : (duration, type, easing, indexAxis = 'x', dataLength) => {
    const delayBetweenPoints = duration / dataLength
    return {
      type : type,
      easing : easing,
      duration : delayBetweenPoints,
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default') {
        delay = context.dataIndex * delayBetweenPoints
      }
      return delay;
    },
  }
}

}

export default donutAnimations