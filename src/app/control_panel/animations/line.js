const lineAnimations = {
  default : (duration) => {
    return {
      duration: duration,
      // delay: undefined
      y : {
        type: 'number',
        easing: 'linear',
        from : 500,
        // to : (ctx) => ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index].getProps(['y'], true).y,
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
      }}
}

export default lineAnimations