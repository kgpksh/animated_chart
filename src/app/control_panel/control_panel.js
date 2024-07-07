"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegratedDataPanel from "./input_file/integrated_data_panel";
import ChartControlPanel from "./select_chart_type/chart_control_panel";
import { Button } from "@/components/ui/button";
import chartController from "../zustand_chart_controller";

export default function ControlPanel() {
    const {chartRef, setAnimation} = chartController()
    return (
        <div className="flex flex-col items-center w-96 border p-3">
            <Button onClick={() => {
                setAnimation(4, 1500)
            }}>Show
            </Button>
            <Tabs defaultValue="dataManagement" className="flex flex-col items-center w-96 h-[85vh] border p-3">
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='dataManagement'>Import Data</TabsTrigger>
                    <TabsTrigger value='chartManagement'>Chart</TabsTrigger>
                </TabsList>
                <TabsContent value='dataManagement'>
                    <IntegratedDataPanel/>
                </TabsContent>
                <TabsContent value='chartManagement' className='w-full h-full'>
                    <ChartControlPanel/>
                </TabsContent>
            </Tabs>
        </div>
        
    )
}