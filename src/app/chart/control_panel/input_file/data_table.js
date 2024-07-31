"use client"

import Spreadsheet from "react-spreadsheet";
import useDataFileStore from "../../zustand_file_storage";

export default function DataTable () {
    const { dataResource, updateValue} = useDataFileStore();

    // const handleCellChange = (prevCell, nextCell, coords) => {
    //     const {row, column} = coords
    //     updateValue(row, column, nextCell.value)
    // }

    const isNotEmptyArr = () => {
        try {
            const check = dataResource[0][0]
            if(typeof(check) === 'undefined') return false
            return true
        } catch(e) {
            return false
        }
        
    }

    return (
        <div className="overflow-auto max-w-full max-h-full">
            {dataResource && isNotEmptyArr() && (
                <Spreadsheet
                    data={dataResource.map(row => row.map(cell => ({ value: cell, readOnly : true })))}
                    // onCellCommit={handleCellChange}
                />
            )}
        </div>
    )
}