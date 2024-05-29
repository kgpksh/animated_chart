import Image from "next/image";
import InputFileButton from "./input_file/input_file_button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <InputFileButton></InputFileButton>
    </main>
  );
}
