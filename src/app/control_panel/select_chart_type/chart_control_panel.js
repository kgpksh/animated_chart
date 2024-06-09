"use client"

import { BigChartTypes } from "@/app/chart-parts-provider";
import chartController from "@/app/zustand_chart_controller";
import { BarChart2, LineChartIcon, Moon, PieChart, ScatterChart } from "lucide-react";

export default function ChartControlPanel() {
    const chartTypeIconSize = 64
    const {chartType, selectChartType} = chartController()
    return (
        <div className="text-xl font-black p-2">
            <div className="">Chart type</div>
                <div className="flex justify-around w-full h-full mt-3 p-3 rounded-md border-2">
                    <button onClick={() => selectChartType(BigChartTypes.BAR)} className={chartType === BigChartTypes.BAR ? 'bg-gray-400' : ''}>
                        <BarChart2 size={chartTypeIconSize}/>
                    </button>
                    <button onClick={() => selectChartType(BigChartTypes.LINE)} className={chartType === BigChartTypes.LINE ? 'bg-gray-400' : ''}>
                        <LineChartIcon size={chartTypeIconSize}/>
                    </button>
                    <button onClick={() => selectChartType(BigChartTypes.PIE)} className={chartType === BigChartTypes.PIE ? 'bg-gray-400' : ''}>
                        <PieChart size={chartTypeIconSize}/>
                    </button>
                    <button onClick={() => selectChartType(BigChartTypes.SCATTERED)} className={chartType === BigChartTypes.SCATTERED ? 'bg-gray-400' : ''}>
                        <ScatterChart size={chartTypeIconSize}/>
                    </button>
                    <button onClick={() => selectChartType(BigChartTypes.DONUT)} className={chartType === BigChartTypes.DONUT ? 'bg-gray-400' : ''}>
                        <Moon size={chartTypeIconSize}/>
                    </button>
                </div>
        </div>
    )
}