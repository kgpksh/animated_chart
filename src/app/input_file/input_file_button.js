"use client";

import { Input } from "@/components/ui/input";
import useDataFileStore from "./zustand_file_storage";
import XLSX from 'xlsx'

export default function InputFileButton() {
    const { file } = useDataFileStore();

    const handleFile = (selectedFile) => {
        if (!selectedFile) return;

        if (file && !window.confirm("이미 파일이 선택되어 있습니다. 새 파일로 교체하시겠습니까?")) {
            return;
        }

        const reader = new FileReader()
        reader.onload = function(f) {
            const data = f.target.result
            const workbook = XLSX.read(data)
            console.log("워크북", workbook)
            const sheet = workbook.Sheets.Sheet1
            console.log("시트", sheet)
            console.log("파일 내용", XLSX.utils.sheet_to_json(sheet, {header:1}))
        }

        reader.readAsArrayBuffer(selectedFile)

        useDataFileStore.setState({ file: selectedFile });
        // alert(selectedFile.name);
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
                <span className="text-gray-500">Drag files</span>
                <span className="text-sm text-gray-400">
                    Click to upload files (files should be under 10 MB)
                </span>
            </label>
        </div>
    );
}
