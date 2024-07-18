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

}

export default barAnimations