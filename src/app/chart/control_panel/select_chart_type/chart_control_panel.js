"use client"

import { BigChartTypes } from "@/app/chart/chart-parts-provider";
import chartController from "@/app/chart/zustand_chart_controller";
import { BarChart2, LineChartIcon, Moon, PieChart, ScatterChart, Sun } from "lucide-react";
import TitleController from "./title_controller";
import CartesianController from "./axes/cartesian/cartesian_axes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import BackgroundController from "./background_controller";
import RadiantAxis from "./axes/radiant/radiant_axis";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function ChartControlPanel() {
    const chartTypeIconSize = 64
    const { chartType, selectChartType, toggleOverlayLabels, changeOverlayLabelsToggle, overlayLabelsSize, changeOverlayLabelsSize } = chartController()
    const overlayLabelSizeRef = useRef(overlayLabelsSize)
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
        <div className="mt-2">Overlay labels</div>
        
        <div className="hover:cursor-pointer mt-2">
                <Checkbox
                id={'toggleOverlayLabels'}
                checked={toggleOverlayLabels}
                onCheckedChange={(checked) => {
                    changeOverlayLabelsToggle(checked)
                }}
                className='mr-2'></Checkbox>
                <label 
                  htmlFor={'toggleOverlayLabels'}
                  className="text-sm hover:cursor-pointer"
                >Toggle overlay labels</label>
            </div>
            <div className="flex mt-2 ml-1">
                <Input
                    defaultValue = {overlayLabelsSize}
                    placeholder= {'overlay labels size'}
                    className='w-1/2'
                    ref={overlayLabelSizeRef}
                    // onChange = {() => {
                        
                    // }}
                />
                <Button 
                    disabled={!toggleOverlayLabels}
                    className='ml-2'
                    onClick={() => {
                        const newSize = overlayLabelSizeRef.current.value
                        changeOverlayLabelsSize(newSize)
                    }}
                >
                    Apply
                </Button>
            </div>
            

            <Accordion type="multiple" collapsible defaultValue={['axes']}>
                {!(chartType === BigChartTypes.DONUT || chartType == BigChartTypes.PIE) ? 
                <AccordionItem value='axes'>
                    <AccordionTrigger>Axes</AccordionTrigger>
                    <AccordionContent>
                        <CartesianController/>
                        <RadiantAxis></RadiantAxis>
                    </AccordionContent>
                </AccordionItem>
                 : ''
                }
                <AccordionItem value='title'>
                    <AccordionTrigger>Title</AccordionTrigger>
                    <AccordionContent><TitleController/></AccordionContent>
                </AccordionItem>
                <AccordionItem value='background'>
                    <AccordionTrigger>Background</AccordionTrigger>
                    <AccordionContent><BackgroundController/></AccordionContent>
                </AccordionItem>
            </Accordion>
            
        </ScrollArea>
    )
}