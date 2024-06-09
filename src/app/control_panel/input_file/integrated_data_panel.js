"use client"

import { Checkbox } from "@/components/ui/checkbox";
import InputFileButton from "./input_file_button";
import DataTable from "./table_component";
import { Button } from "@/components/ui/button";
import useDataFileStore from "@/app/zustand_file_storage";
import chartController from "@/app/zustand_chart_controller";
const datasetLabel = 'datasetLabel'

export default function IntegratedDataPanel() {
  const { dataResource, transpose} = useDataFileStore();
  const { useLabel, changeUseLabelStatus } = chartController()
  
    return (
      <div className="flex flex-col items-center w-80 h-full">
        <InputFileButton/>
        <DataTable/>
        {dataResource? <div className="flex flex-col mt-5">
          <Button className='mb-3' onClick={() => transpose()}>Change the direction of the X/Y axis</Button>
          <div className="hover:cursor-pointer">
            <Checkbox id={datasetLabel} checked={useLabel} onCheckedChange={changeUseLabelStatus} className='mr-2'></Checkbox>
            <label 
              htmlFor={datasetLabel}
              className="text-sm text-gray-400 hover:cursor-pointer"
            >Use the first column of each row as a label</label>
          </div>
        </div> : ''}
      </div>
    )
}