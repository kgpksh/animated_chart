import { BigChartTypes } from "./chart-parts-provider";

const { create } = require("zustand");

const chartController = create((set, get) => ({
  key : 0,
  changeKey() {
    set({key : get().key === 0 ? 1 : 0})
  },
  chartRef: null,
  setChartRef: (ref) => set({ chartRef: ref }),
  chartType : BigChartTypes.BAR,
  selectChartType(inputType) {
      set({chartType : inputType})
  },

  animation: undefined,
  setAnimation : (dataResourceLength, totalDuration) => {
    const delayBetweenPoints = totalDuration / dataResourceLength
    let delayed = false
    let isRecord = false
    set({animation : {
      duration: delayBetweenPoints,
      
      onComplete: function (ctx) {
        isRecord = false
        console.log('완료', delayed)
        
      },
      onProgress : (ctx) => {
        console.log(isRecord)        
      },
      x: {
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
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
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * delayBetweenPoints;
          }
          return delay;
        },
        type: 'number',
        easing: 'linear',
        from: (ctx) => ctx.index === 0 ? NaN : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y,
        // to: nextY
      }     
    }})
  },

  backgroundColor: '#FFFFFF',
  setBackgroundColor(color) {
      set({backgroundColor : color})
  },
  indexAxis : 'x',
  changeIndexAxis(newIndexAxis) {
    set({indexAxis : newIndexAxis})
  },

  useLabel : false,
  changeUseLabelStatus() {
    set((state) => {
      const changedState = !(state.useLabel)
      return {useLabel : changedState}
    })
  },
  cartesianScale : {
    x: {
      min : null,
      max : null,
      stacked: false,
      title : {
        display : false,
        text : 'X',
        align : 'end',
        font : {
          size : 50,
          weight : 'bold'
        }
      },
      type:'category',
      ticks: {
        stepSize: null,
        color : null,
        font : {
          size : null
        }
      },
      grid : {
        display : true,
        color : 'lightgrey'
      }
    },
    y: {
      min : null,
      max : null,
      stacked: false,
      title : {
        display : false,
        text : 'Y',
        align : 'end',
        font : {
          size : 50,
          weight : 'bold'
        }
      },
      
      type:'linear',
      ticks: {
        stepSize: null,
        color : null,
        font : {
          size : null
        }
      },
      grid : {
        display : true,
        color : 'lightgrey'
      }
    }
  },
  changeCartesianScale(scale){
    set({cartesianScale : scale})
  },

  radarElementsFill : {
    line : {
      fill : true
    }
  },
  changeRadarElementsFill(value) {
    set({radarElementsFill : value})
  },

  radarScale : {
    r : {
      pointLabels : {
        display : true,
        color : 'grey',
        font : {
          size : 20,
        }
      },
      ticks: {
        stepSize : null,
        display : true,
        backdropColor : 'rgb(0,0,0,0)',
        color: 'grey',
        font : {
          size : null
        }
      },
      angleLines : {
        display : true,
        color : 'lightgrey'
      },
      grid : {
        display : true,
        color : 'lightgrey'
      }
    }
  },

  changeRadarScale(scale) {
    set({radarScale : scale})
  },

  title: {
    display : false,
    text : 'New title',
    color: '#000000',
    align: 'center',
    position: 'top',
    font :{
      size : 20,
      weight : 'bold'
    },
  },
  changeTitle(title){
    set({title : title})
  }
}))

export default chartController