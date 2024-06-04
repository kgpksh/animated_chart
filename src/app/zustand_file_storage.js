const { create } = require("zustand");

const useDataFileStore = create((set, get) => ({
    dataResource : null,
    updateValue (row, column, value) {
        get().dataResource[row][column] = value
    }
}))

export default useDataFileStore