// "use client"
import ChartView from "./chart_components/chart_component";
import IntegratedDataPanel from "./control_panel/input_file/integrated_data_panel";

export default function Home() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className='h-full w-4/5 flex content-center items-center justify-center mr-5'>
      <ChartView />
        
      </div>
      <div className='h-full w-1/5'>
        <IntegratedDataPanel />
      </div>
    </div>
  );
}
