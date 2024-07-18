const lineAnimations = {
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
  progressive : (duration) => {
    return {
        duration: duration,
        x: {
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default') {
              delay = context.dataIndex * duration;
            }
            return delay;
          },
          type: 'number',
          easing: 'linear',
          from: (ctx) => ctx.index === 0 ? NaN : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['x'], true).x,
        },
        y: {
          delay: (context) => {
            let delay = 0;
            if (context.type === 'data' && context.mode === 'default') {
              delay = context.dataIndex * duration;
            }
            return delay;
          },
          type: 'number',
          easing: 'linear',
          from: (ctx) => ctx.index === 0 ? NaN : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y,
          // to: nextY
        }
    }
  }
}

export default lineAnimations