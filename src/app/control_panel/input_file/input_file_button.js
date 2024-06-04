"use client";

import { Input } from "@/components/ui/input";
import useDataFileStore from "../../zustand_file_storage";
import XLSX from 'xlsx'

export default function InputFileButton() {
    const { dataResource } = useDataFileStore();

    const handleFile = (selectedFile) => {
        if (!selectedFile) return;

        if(dataResource !== null) {
            const changeAnswer = window.confirm("A file is already selected. Do you want to replace it with a new file?")
            if(!changeAnswer) {
                return
            }
        }

        const reader = new FileReader()
        reader.onload = function(f) {
            const data = f.target.result

            const workbook = XLSX.read(data, {dense:true})
            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const dataArr = XLSX.utils.sheet_to_json(sheet, {header:1})

            let hasEmptyCell = false
            for (let i = 0; i < dataArr.length; i++) {
                for (let j = 0; j < dataArr[i].length; j++) {
                    if (dataArr[i][j] === undefined || dataArr[i][j] === null || dataArr[i][j] === "") {
                        hasEmptyCell = true
                        break
                    }
                }
                if (hasEmptyCell) break
            }

            if (hasEmptyCell) {
                alert("Empty cells are included. Please check the data.")
                return
            }
            useDataFileStore.setState({dataResource : dataArr})
        }
        reader.readAsArrayBuffer(selectedFile)
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        handleFile(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        handleFile(selectedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    

    return (
        <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <Input
                id="picture"
                type="file"
                onChange={handleFileChange}
                className="hidden"
            />
            <label
                htmlFor="picture"
                className="flex flex-col items-center cursor-pointer"
            >
                <div className="flex flex-col items-center justify-center w-12 h-12 mb-1 text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                </div>
                <span className="text-gray-500">Click or drag files here.</span>
                <span className="text-sm text-gray-400">
                    Click to upload Excel files (.csv,.xlsx, etc).
                </span>
                <span className="text-sm text-gray-400">
                    Empty cells in data are not allowed.
                </span>
                <span className="text-sm text-gray-400">
                    Use a single sheet with labels and numbers.
                </span>
            </label>
        </div>
    );
}
