import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChartViewSample from "./chart_view_sample";
import TableViewSample from "./table_view_sample";
import { ArrowDown } from "lucide-react";

export default function Home() {
    return (
        <div className="flex w-full h-full items-center justify-center">
          <div className="w-[700px] h-1/2 p-3">
            <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">Chart animation tool</h2>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">- Convert your excel data to custom chart animation</h3>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">- Download mp4 video files to your computer</h3>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">- Running on your local PC</h3>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">- No chart data sending to server</h3>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">- Unlock tool and features in $15/mo</h3>
            <Button className='mt-6'><Link href={'/chart'}>Move to chart editor</Link></Button>
          </div>
          <div className="w-[800px] h-2/3 items-center">
            <TableViewSample />
            <div className="flex justify-center">
              <ArrowDown width={100} height={100} className="flex justify-center"/>
            </div>
            <ChartViewSample />
          </div>
        </div>
      
    );
  }
  