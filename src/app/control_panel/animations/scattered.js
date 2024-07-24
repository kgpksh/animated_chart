const scatteredAnimations = {
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

    from_left_bottom : (duration, type, easing, indexAxis = 'y') => {
      return {
        duration : duration,
        type : type,
        easing : easing,
        x : {
          from : (ctx) => 0
        },
        y : {
          from : (ctx) => ctx.chart.height
        }
      }
    },

    from_right_bottom : (duration, type, easing, indexAxis = 'y') => {
      return {
        duration : duration,
        type : type,
        easing : easing,
        x : {
          from : (ctx) => ctx.chart.width
        },
        y : {
          from : (ctx) => ctx.chart.height
        }
      }
    },

    from_left_top : (duration, type, easing, indexAxis = 'y') => {
      const axis = indexAxis === 'y' ? 'x' : 'y'
      return {
        duration : duration,
        type : type,
        easing : easing,
        x : {
          from : (ctx) => 0
        },
        y : {
          from : (ctx) => 0
        }
      }
    },

    from_right_top : (duration, type, easing, indexAxis = 'y') => {
      return {
        duration : duration,
        type : type,
        easing : easing,
        x : {
          from : (ctx) => ctx.chart.width
        },
        y : {
          from : (ctx) => 0
        }
      }
    },

}

export default scatteredAnimations