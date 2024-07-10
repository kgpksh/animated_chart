const lineAnimations = {
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
    progressive : (delayBetweenPoints) => {
      return {
          duration: delayBetweenPoints,
          x: {
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default') {
                delay = context.dataIndex * delayBetweenPoints;
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
                delay = context.dataIndex * delayBetweenPoints;
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