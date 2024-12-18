import ChartView from "./chart_components/chart_component";
import ControlPanel from "./control_panel/control_panel";

export default function Chart() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className='h-full w-4/5 flex content-center items-center justify-center mr-5'>
      <ChartView />
        
      </div>
      <div className='h-full w-1/5'>
        <ControlPanel/>
      </div>
    </div>
  );
}
