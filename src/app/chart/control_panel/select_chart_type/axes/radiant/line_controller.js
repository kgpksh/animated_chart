import chartController from "@/app/chart/zustand_chart_controller";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function RadiantLineController({line}) {
    const {radarScale, changeRadarScale} = chartController()
    const [color, setColor] = useColor(radarScale.r[line].color);
    return (
        <div className="flex flex-col mt-3">
            <div className="flex">
                <Checkbox
                        id={'showLine'}
                        className='mr-2'
                        checked={radarScale.r[line]?.display}
                        onCheckedChange={(checked) => {
                            const newLine = { ...radarScale }
                            newLine.r[line].display = checked
                            changeRadarScale(newLine)
                        }}
                    />
                <Label htmlFor={'showLine'} className='font-bold hover:cursor-pointer mr-2'>{line === 'grid' ? 'Show grid lines' : 'Show angle lines'}</Label>
            </div>
            <div className="flex mt-2">
                <div className="mr-2">
                    <Popover
                    onOpenChange={(isOpen) => {
                        if(!isOpen) {
                            const newLine = { ...radarScale }
                            newLine.r[line].color = color.hex
                            changeRadarScale(newLine)
                        }
                    }}
                    >
                        <PopoverTrigger>
                            <Button variant="outline">
                                <div className="w-[20px] h-[20px] mr-2 border" style={{ backgroundColor: radarScale.r[line].color }}></div> Change color
                                </Button>
                            </PopoverTrigger>
                        <PopoverContent><ColorPicker color={color} onChange={setColor}/></PopoverContent>
                    </Popover>
                </div>
                <Button onClick={() => {
                    const newLine = { ...radarScale }
                    newLine.r[line].color = 'black'
                    changeRadarScale(newLine)
                }} className='mr-2'>
                    To dark
                </Button>

                <Button variant="outline" onClick={() => {
                    const newLine = { ...radarScale }
                    newLine.r[line].color = '#FFFFFF'
                    changeRadarScale(newLine)
                }}>
                    To light
                </Button>
            </div>
        </div>
    )
}