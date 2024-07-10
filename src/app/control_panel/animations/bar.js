const barAnimations = {
    default : (delayBetweenPoints) => {
        return {
          duration: delayBetweenPoints,
          y : {
            type: 'number',
            easing: 'linear',
            from : (ctx) => 100
          }
        }
    },
    another : (delayBetweenPoints) => {
        return {
          duration: delayBetweenPoints,
          y : {
            type: 'number',
            easing: 'linear',
            from : (ctx) => 0
          }
        }
    },

}

export default barAnimations