import { BigChartTypes } from "./chart-parts-provider";

const { create } = require("zustand");

const chartController = create((set) => ({
    chartType : BigChartTypes.BAR,
    selectChartType(inputType) {
        set({chartType : inputType})
    },

    backgroundColor: '#FFFFFF',
    setBackgroundColor(color) {
        set({backgroundColor : color})
    },

    useLabel : false,
    changeUseLabelStatus() {
        set((state) => {
            const changedState = !(state.useLabel)
            return {useLabel : changedState}
        })
    },
    
    options : {},
    setOptions(option) {
        set({options : option})
    }
}))

export default chartController