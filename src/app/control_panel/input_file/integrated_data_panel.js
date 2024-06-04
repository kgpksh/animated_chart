import DataTable from "./data_table";
import InputFileButton from "./input_file_button";

export default function IntegratedDataPanel() {
    return (
        <div className="flex w-1/4 h-full flex-col items-center p-12">
          <InputFileButton></InputFileButton>
          <DataTable></DataTable>
        </div>
      )
}