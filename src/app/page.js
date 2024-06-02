// "use client"
import InputFileButton from "./input_file/input_file_button";
import DataTable from "./input_file/data_table";
import useDataFileStore from "./input_file/zustand_file_storage";

export default function Home() {
  // const {dataResource} = useDataFileStore()
  return (
    <main>
      <div className="flex max-w-xl flex-col items-center p-7">
        <InputFileButton></InputFileButton>
        <DataTable></DataTable>
        {/* <button onClick={() => alert(dataResource)}>test</button> */}
      </div>
      
    </main>
  );
}
