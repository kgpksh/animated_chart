import { BigChartTypes } from "./chart-parts-provider";

const { create } = require("zustand");

const modelOptions = {
  scales: {
    x: {
      beginAtZero: true,
      stacked: true
    },
    y: {
      beginAtZero: true,
      stacked: true
    }
  },
  plugins: {
  }
}
Object.freeze(modelOptions)

const chartController = create((set, get) => ({
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

  barOptions: {...modelOptions},
    setBarOptions(option) {
      set({[BigChartTypes.LINE] : option})
    },
    
  lineOptions : {...modelOptions},
  setLineOptions(option) {
      set({options : option})
    },
  pieOptions : {...modelOptions},
    setBarOptions(option) {
      set({[BigChartTypes.PIE] : option})
    },
  scatteredOptions : {...modelOptions},
    setBarOptions(option) {
      set({[BigChartTypes.SCATTERED] : option})
    },
  donutOptions : {...modelOptions},
    setBarOptions(option) {
      set({[BigChartTypes.DONUT] : option})
    },
}))

export default chartController