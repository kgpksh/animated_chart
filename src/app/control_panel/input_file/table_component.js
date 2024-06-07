"use client"

import useDataFileStore from "@/app/zustand_file_storage"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useMemo } from "react"

export default function DataTable() {
    const { dataResource, updateValue } = useDataFileStore();

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

    return (
        <Table className='overflow-auto'>
            <TableBody className='overflow-auto'>
                {rows.length ? (
                    rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell) => (
                                <TableCell key={`${rowIndex}-${cell.colIndex}`} className="p-2 border border-gray-300 text-center min-w-[80px] w-[100px] h-[50px]">
                                    <input
                                        type="text" // ensure input type is text to allow any input
                                        value={cell.value}
                                        onChange={(e) => updateValue(cell.rowIndex, cell.colIndex, e.target.value)}
                                        className="w-full h-full border-none text-center text-base box-border p-0 m-0 outline-none"
                                    />
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
    );
}
