"use client"

import { BigChartTypes } from "@/app/chart-parts-provider";
import chartController from "@/app/zustand_chart_controller";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, LineChartIcon, Moon, PieChart, ScatterChart } from "lucide-react";
import TitleController from "./title_controller";

export default function ChartControlPanel() {
    const chartTypeIconSize = 64
    const {chartType, selectChartType, indexAxis, changeIndexAxis, barOptions, setBarOptions} = chartController()
    return (
        <div className="text-xl font-black p-2">
            <div>Chart type</div>
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
            { chartType !== BigChartTypes.PIE ?
                
                <div className="flex flex-col mt-3">
                    <div>Axes</div>
                    <div className="rounded-md border-2 p-3 mt-2">
                        <div className="text-base">Direction</div>
                        <Tabs 
                            defaultValue = {indexAxis === 'x' ? 'vertical' : 'horizontal'} 
                            onValueChange={(value) => {
                                const newIndexAxis = value === 'vertical' ? 'x' : 'y'
                                changeIndexAxis(newIndexAxis)
                            }}>
                            <TabsList className='grid w-full grid-cols-2 my-1'>
                                <TabsTrigger value='vertical'>Vertical</TabsTrigger>
                                <TabsTrigger value = 'horizontal'>Horizontal</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
                : ''
            }

            <TitleController></TitleController>
            
            
            {chartType === BigChartTypes.BAR ?
                <div className="hover:cursor-pointer mt-3 ml-2">
                <Checkbox
                id={'barStack'}
                checked={barOptions.scales.y.stacked}
                onCheckedChange={(checked) => {
                    const newStacked = { ...barOptions }
                    newStacked.scales.x.stacked = checked
                    newStacked.scales.y.stacked = checked
                    setBarOptions(newStacked)
                }}
                className='mr-2'></Checkbox>
                <label 
                  htmlFor={'barStack'}
                  className="text-sm text-gray-400 hover:cursor-pointer"
                >Stacked Chart</label>
              </div>
             : ''}
            
        </div>
    )
}