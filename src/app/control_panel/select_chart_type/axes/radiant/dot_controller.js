import chartController from "@/app/zustand_chart_controller";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRef } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function RadiantDotController({dot}) {
    const {radarScale, changeRadarScale} = chartController()
    const [color, setColor] = useColor(radarScale.r[dot].color);
    const fontSizeRef = useRef()
    return (
        <div className="flex flex-col mt-2 p-3 rounded-md border-2">
           {dot === 'ticks' ? <div className="flex">
                <Checkbox
                        id={'showTicks'}
                        className='mr-2'
                        checked={radarScale.r[dot]?.display}
                        onCheckedChange={(checked) => {
                            const newDot = { ...radarScale }
                            newDot.r[dot].display = checked
                            changeRadarScale(newDot)
                        }}
                    />
                <Label htmlFor={'showTicks'} className='font-bold hover:cursor-pointer mr-2'>{dot === 'ticks' ? 'Show ticks' : 'Show point labels'}</Label>
            </div> : ''}
            <div className="flex mt-2">
                <div className="mr-2 w-1/2">
                    <Popover
                    onOpenChange={(isOpen) => {
                        if(!isOpen) {
                            const newDot = { ...radarScale }
                            newDot.r[dot].color = color.hex
                            changeRadarScale(newDot)
                        }
                    }}
                    >
                        <PopoverTrigger>
                            <Button variant="outline">
                                <div className="w-[20px] h-[20px] mr-2 border" style={{ backgroundColor: radarScale.r[dot].color }}></div> Change color
                                </Button>
                            </PopoverTrigger>
                        <PopoverContent><ColorPicker color={color} onChange={setColor}/></PopoverContent>
                    </Popover>
                </div>
                
                <div className="flex w-1/2 text-center">
                    <Input
                        className='ml-1'
                        onChange={() => {
                            const newDot = { ...radarScale }
                            newDot.r[dot].font.size = fontSizeRef.current.value
                            changeRadarScale(newDot)
                        }}
                        // defaultValue = {radarScale.r[dot].font.size}
                        placeholder='Font size'
                        ref={fontSizeRef}
                        type='number'
                        min='1'
                    />
                </div>
            </div>
        </div>
    )
}