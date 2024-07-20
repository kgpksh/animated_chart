"use client"

import chartController from "@/app/zustand_chart_controller";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import animations from "./animations";

export default function AnimationControlPanel() {
    const durationRef = useRef(1500)
    const chartType = chartController((state) => state.chartType)
    const animationsOfChartType = chartController((state) => state.animationsOfChartType)
    const setAniType = chartController((state) => state.setAniType)
    const setDuration = chartController((state) => state.setDuration)

    const currentAnimations = animations[chartType]
    return (
        <div>
            <div className="ml-2 mb-2 text-2xl font-bold">{chartType.toUpperCase()}</div>
            <div className="flex flex-col mt-2 w-full">
                <Label htmlFor="duration" className="font-bold mb-3">Animation duration second</Label>
                <div className="flex w-full">
                    <Input
                        id="duration"
                        placeholder="Animation Duration"
                        ref={durationRef}
                        type="number"
                        defaultValue={1500}
                        className="w-3/5"
                    />
                    <Button
                        className="w-2/5 ml-2"
                        onClick={() => setDuration(durationRef.current.value)}
                    >Apply duration</Button>
                </div>
            </div>
            
            
            <ScrollArea className="h-[78vh] text-xl font-black p-1 mt-2 flex flex-col">
                <div className="flex flex-col space-y-1">
                    {Object.keys(currentAnimations).map(animation => (
                        <Button
                            disabled={animationsOfChartType[chartType].name === animation}
                            key={animation}
                            className="mt-1"
                            onClick={() => {
                                setAniType(chartType, animation, durationRef.current.value)
                            }}
                        >
                            {animation}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        </div>
        
            
    )
}