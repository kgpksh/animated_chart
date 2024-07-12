const barAnimations = {
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

}

export default barAnimations