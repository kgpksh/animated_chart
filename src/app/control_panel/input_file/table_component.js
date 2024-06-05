"use client"

import useDataFileStore from "@/app/zustand_file_storage"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react"

export default function DataTable() {
    const { dataResource, updateValue, transposeData } = useDataFileStore();

    const columns = useMemo(() => {
        if (!dataResource || dataResource.length === 0) return [];
        return dataResource[0].map((header, colIndex) => ({
            accessorKey: `col${colIndex}`,
            header: String(header),
            cell: ({ row }) => {
                const cellData = row.original[`col${colIndex}`];
                const { rowIndex, colIndex: cellColIndex } = cellData;
                return (
                    <input
                        value={cellData.value}
                        onChange={(e) => updateValue(rowIndex + 1, cellColIndex, e.target.value)}
                    />
                );
            },
        }));
    }, [dataResource, updateValue]);

    const data = useMemo(() => {
        if (!dataResource || dataResource.length === 0) return [];
        return dataResource.slice(1).map((row, rowIndex) => {
            return row.reduce((acc, cell, colIndex) => {
                acc[`col${colIndex}`] = { value: cell, rowIndex, colIndex };
                return acc;
            }, {});
        });
    }, [dataResource]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <div className="overflow-auto max-w-full max-h-full">
            <button onClick={transposeData}>Transpose</button>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
