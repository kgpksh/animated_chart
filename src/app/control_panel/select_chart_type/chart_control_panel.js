"use client"

import { BigChartTypes } from "@/app/chart-parts-provider";
import chartController from "@/app/zustand_chart_controller";
import { BarChart2, LineChartIcon, Moon, PieChart, ScatterChart, Sun } from "lucide-react";
import TitleController from "./title_controller";
import CartesianController from "./axes/cartesian/cartesian_axes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BackgroundController from "./background_controller";
import RadiantAxis from "./axes/radiant/radiant_axis";

export default function ChartControlPanel() {
    const chartTypeIconSize = 64
    const { chartType, selectChartType } = chartController()
    return (
        <ScrollArea className="h-[78vh] text-xl font-black p-1">
            <div>Chart type</div>
            
            <div className="grid grid-cols-5 gap-4 w-full h-full mt-3 p-3 rounded-md border-2">
            <button 
                onClick={() => selectChartType(BigChartTypes.BAR)} 
                className={`flex items-center justify-center ${chartType === BigChartTypes.BAR ? 'bg-gray-400' : ''}`}
            >
                <BarChart2 size={chartTypeIconSize}/>
            </button>
            <button 
                onClick={() => selectChartType(BigChartTypes.LINE)} 
                className={`flex items-center justify-center ${chartType === BigChartTypes.LINE ? 'bg-gray-400' : ''}`}
            >
                <LineChartIcon size={chartTypeIconSize}/>
            </button>
            <button 
                onClick={() => selectChartType(BigChartTypes.PIE)} 
                className={`flex items-center justify-center ${chartType === BigChartTypes.PIE ? 'bg-gray-400' : ''}`}
            >
                <PieChart size={chartTypeIconSize}/>
            </button>
            <button 
                onClick={() => selectChartType(BigChartTypes.SCATTERED)} 
                className={`flex items-center justify-center ${chartType === BigChartTypes.SCATTERED ? 'bg-gray-400' : ''}`}
            >
                <ScatterChart size={chartTypeIconSize}/>
            </button>
            <button 
                onClick={() => selectChartType(BigChartTypes.DONUT)} 
                className={`flex items-center justify-center ${chartType === BigChartTypes.DONUT ? 'bg-gray-400' : ''}`}
            >
                <Moon size={chartTypeIconSize}/>
            </button>
            <button 
                onClick={() => selectChartType(BigChartTypes.RADAR)} 
                className={`flex items-center justify-center ${chartType === BigChartTypes.RADAR ? 'bg-gray-400' : ''}`}
            >
                <Sun size={chartTypeIconSize}/>
            </button>
            <button 
                onClick={() => selectChartType(BigChartTypes.PORAR)} 
                className={`flex items-center justify-center ${chartType === BigChartTypes.PORAR ? 'bg-gray-400' : ''}`}
            >
                <Sun size={chartTypeIconSize}/>
            </button>
        </div>

            <Accordion type="multiple" collapsible defaultValue={['axes']}>
                <AccordionItem value='axes'>
                    <AccordionTrigger>Axes</AccordionTrigger>
                    <AccordionContent>
                        <CartesianController/>
                        <RadiantAxis></RadiantAxis>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='background'>
                    <AccordionTrigger>Background</AccordionTrigger>
                    <AccordionContent><BackgroundController/></AccordionContent>
                </AccordionItem>
                <AccordionItem value='title'>
                    <AccordionTrigger>Title</AccordionTrigger>
                    <AccordionContent><TitleController/></AccordionContent>
                </AccordionItem>
            </Accordion>
            
        </ScrollArea>
    )
}