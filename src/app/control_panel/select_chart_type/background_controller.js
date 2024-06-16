import chartController from "@/app/zustand_chart_controller";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function BackgroundController() {
    const {backgroundColor, setBackgroundColor} = chartController()
    const [color, setColor] = useColor(backgroundColor);
    return (
        <div className="flex flex-col">
            <div className="flex">
                <div className="mr-2">
                    <Popover
                    onOpenChange={(isOpen) => {
                        if(!isOpen) {
                            setBackgroundColor(color.hex)
                        }
                    }}
                    >
                        <PopoverTrigger>
                            <Button variant="outline">
                                <div className="w-[20px] h-[20px] mr-2 border" style={{ backgroundColor: backgroundColor }}></div> Change color
                                </Button>
                            </PopoverTrigger>
                        <PopoverContent><ColorPicker color={color} onChange={setColor}/></PopoverContent>
                    </Popover>
                </div>
                <Button onClick={() => {setBackgroundColor('#09090B')}} className='mr-2'>To dark</Button>
                <Button variant="outline" onClick={() => {setBackgroundColor('#FFFFFF')}}>To light</Button>
            </div>
        </div>
    )
}