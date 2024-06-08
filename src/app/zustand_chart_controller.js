const { create } = require("zustand");

const chartController = create((set) => ({
    chartType : null,
    selectChartType(inputType) {
        set({chartType : inputType})
    },
    
    options : {},
    setOptions(option) {
        set({options : option})
    }
}))

export default chartController