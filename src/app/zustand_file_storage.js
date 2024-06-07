const { create } = require("zustand");

const useDataFileStore = create((set, get) => ({
    dataResource: null,
    updateValue: (row, column, value) => {
        set((state) => {
            const newDataResource = [...state.dataResource];

            newDataResource[row][column] = value;
            return { dataResource: newDataResource };
        });
    },
}));

export default useDataFileStore;
