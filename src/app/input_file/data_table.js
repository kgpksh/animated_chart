"use client"

import Spreadsheet from "react-spreadsheet";
import useDataFileStore from "./zustand_file_storage";

export default function DataTable () {
    const { dataResource, updateValue} = useDataFileStore();

    const handleCellChange = (prevCell, nextCell, coords) => {
        const {row, column} = coords
        console.log("프레브", prevCell)
        console.log("넥스트", nextCell)
        console.log("좌표", coords)
        updateValue(row, column, nextCell.value)
    }

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
        <div className="overflow-auto max-w-full max-h-96">
            {dataResource && isNotEmptyArr() && (
                <Spreadsheet
                    data={dataResource.map(row => row.map(cell => ({ value: cell, readOnly : true })))}
                    // onCellCommit={handleCellChange}
                />
            )}
        </div>
    )
}