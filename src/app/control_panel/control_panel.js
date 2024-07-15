"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegratedDataPanel from "./input_file/integrated_data_panel";
import ChartControlPanel from "./select_chart_type/chart_control_panel";
import { Button } from "@/components/ui/button";
import chartController from "../zustand_chart_controller";
import AnimationControlPanel from "./animations/animation_control_panel";
import lineAnimations from "./animations/line";

export default function ControlPanel() {
    const {chartRef, setAnimation} = chartController()
    const startRecord = chartController((state) => state.startRecord)
    return (
        <div className="flex flex-col items-center w-96 border p-3">
            <Button onClick={() => {
                startRecord()
                const ctx = chartRef.current
                ctx.reset()
                ctx.update()
            }}>ChangeAnimation
            </Button>
            <Tabs defaultValue="dataManagement" className="flex flex-col items-center w-96 h-[85vh] border p-3">
                <TabsList className='w-full'>
                    <TabsTrigger value='dataManagement' className='w-full'>Import Data</TabsTrigger>
                    <TabsTrigger value='chartManagement' className='w-full'>Chart</TabsTrigger>
                    <TabsTrigger value='animationManagement' className='w-full'>Animation</TabsTrigger>
                </TabsList>
                <TabsContent value='dataManagement'>
                    <IntegratedDataPanel/>
                </TabsContent>
                <TabsContent value='chartManagement' className='w-full h-full'>
                    <ChartControlPanel/>
                </TabsContent>
                <TabsContent value='animationManagement' className='w-full h-full'>
                    <AnimationControlPanel/>
                </TabsContent>
            </Tabs>
        </div>
        
    )
}