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
        text : 'X'
      },
      type:'category',
      ticks: {
        stepSize: null
      }
    },
    y: {
      min : null,
      max : null,
      stacked: false,
      title : {
        display : false,
        text : 'Y'
      },
      
      type:'linear',
      // ticks: {
      //   stepSize: 1
      // }
    }
  },
  changeCartesianScale(scale){
    set({cartesianScale : scale})
  },

  title: {
    display : false,
    text : 'New title',
    color: null,
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