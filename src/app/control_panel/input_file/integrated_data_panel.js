"use client"

import InputFileButton from "./input_file_button";
import DataTable from "./table_component";

export default function IntegratedDataPanel() {
    return (
      <div className="flex flex-col items-center w-80 h-full">
        <InputFileButton/>
        <DataTable/>
      </div>
    )
}