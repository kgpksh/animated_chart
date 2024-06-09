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
    transpose: () => {
        set((state) => {
            const transposed = state.dataResource[0].map((_, colIndex) =>
                state.dataResource.map(row => row[colIndex])
            );
            return { dataResource: transposed };
        });
    }
}));

export default useDataFileStore;
