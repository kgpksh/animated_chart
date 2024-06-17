import { BigChartTypes } from "./chart-parts-provider";

const { create } = require("zustand");

const modelOptions = {
  plugins: {
    
  }
}
Object.freeze(modelOptions)

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
        stepSize: null
      },
      grid : {
        display : true
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
        stepSize: null
      },
      grid : {
        display : true
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
        display : true,
        backdropColor : 'rgb(0,0,0,0)',
        color: 'grey',
        font : {
          size : 10
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
  },

  barOptions: {...modelOptions},
    setBarOptions(option) {
      set({barOptions : option})
    },
    
  lineOptions : {...modelOptions},
  setLineOptions(option) {
      set({lineOptions : option})
    },
  pieOptions : {...modelOptions},
    setBarOptions(option) {
      set({pieOptions : option})
    },
  scatteredOptions : {...modelOptions},
    setBarOptions(option) {
      set({scatteredOptions : option})
    },
  donutOptions : {...modelOptions},
    setBarOptions(option) {
      set({donutOptions : option})
    },
}))

export default chartController