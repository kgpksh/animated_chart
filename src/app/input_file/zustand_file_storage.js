const { create } = require("zustand");

const useDataFileStore = create(() => ({
    file : null
}))

export default useDataFileStore