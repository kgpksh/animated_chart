"use client"

import chartController from "@/app/zustand_chart_controller";
import useDataFileStore from "@/app/zustand_file_storage"
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useMemo } from "react"

export default function DataTable() {
    const { dataResource, updateValue } = useDataFileStore();
    const { useLabel } = chartController()

    const rows = useMemo(() => {
        if (!dataResource || dataResource.length === 0) return [];
        return dataResource.map((row, rowIndex) => {
            return row.map((cell, colIndex) => ({
                value: cell,
                rowIndex,
                colIndex
            }));
        });
    }, [dataResource]);

    const changeLabelUsing = (rowIndex, colIndex) => {
        if(useLabel === false) {
            return ''
        }
        
        if(rowIndex === 0) {
            return ''
        }

        if(colIndex !== 0) {
            return ''
        }

        return 'border-4 border-red-400'
    }

    return (
        <div className="w-full max-h-[52vh] overflow-auto">
            <Table>
                <TableBody>
                    {rows.length ? (
                        rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex} className={rowIndex === 0 ? 'border-4 border-green-400' : ''}>
                                {row.map((cell) => (
                                    <TableCell key={`${rowIndex}-${cell.colIndex}`} className={"p-2 border border-gray-300 text-center min-w-[80px] w-[100px] h-[50px]" + changeLabelUsing(rowIndex, cell.colIndex)}>
                                        {!(useLabel && rowIndex === 0 && cell.colIndex === 0) ?<Input
                                            type="text" // ensure input type is text to allow any input
                                            value={cell.value}
                                            onChange={(e) => updateValue(cell.rowIndex, cell.colIndex, e.target.value)}
                                            className="w-full h-full border-none text-center text-base box-border p-0 m-0 outline-none bg-transparent font-black"
                                        /> :
                                        <div className="font-bold text-red-300">legend</div>}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={dataResource?.[0]?.length || 1} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>   
        </div>
    );
}
