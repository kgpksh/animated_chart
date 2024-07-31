import chartController from "@/app/chart/zustand_chart_controller"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRef } from "react"
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function AxesController({axis}) {
    const {cartesianScale, changeCartesianScale} = chartController()
    const minRef = useRef(null)
    const maxRef = useRef(null)
    const titleRef = useRef(null)
    const titleFontRef = useRef(null)
    const tickSizetRef = useRef(null)
    const [color, setColor] = useColor(cartesianScale[axis].grid.color);

    return (
        <div className="flex flex-col mt-2">
            <h5 className="text-sm">Axis type</h5>
            <div className="mt-1">
                <Select
                    onValueChange={(value) => {
                        const newType = { ...cartesianScale }
                        newType[axis].type = value
                        changeCartesianScale(newType)
                    }}
                    value={cartesianScale[axis]?.type}
                    defaultValue={cartesianScale[axis]?.type}
                >
                    <SelectTrigger>
                        <SelectValue placeholder ='Select axis type'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Axis type</SelectLabel>
                            <SelectItem value='category'>'Category'</SelectItem>
                            <SelectItem value='linear'>Linear</SelectItem>
                            <SelectItem value='logarithmic'>Log</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <h5 className="text-sm mt-2">Title</h5>
            <div className="flex mt-1 ml-2 items-center">
                <Checkbox
                    id={'title'}
                    className='mr-2'
                    checked={cartesianScale[axis]?.title.display}
                    onCheckedChange={(checked) => {
                        const newTitle = { ...cartesianScale }
                        newTitle[axis].title.display = checked
                        changeCartesianScale(newTitle)
                    }}
                />
                <Label htmlFor={'title'} className='font-bold hover:cursor-pointer mr-2'>Show axis title</Label>

                <Input
                    defaultValue = {cartesianScale[axis]?.title.text}
                    placeholder= {axis.toUpperCase() + ' title'}
                    className='w-1/2'
                    ref={titleRef}
                    onChange = {() => {
                        const newTitle = { ...cartesianScale }
                        newTitle[axis].title.text = titleRef.current.value
                        changeCartesianScale(newTitle)
                    }}
                ></Input>
            </div>
            <div className="flex mt-3">
                <Input
                    defaultValue={cartesianScale[axis]?.title.font.size}
                    placeholder='Font size'
                    ref={titleFontRef}
                    type='number'
                    min={0}
                    className='mr-3'
                    onChange = {() => {
                        const newTitle = { ...cartesianScale }
                        newTitle[axis].title.font.size = titleFontRef.current.value
                        changeCartesianScale(newTitle)
                    }}
                />

                <Select
                    onValueChange={(value) => {
                        const newType = { ...cartesianScale }
                        newType[axis].title.font.weight = value
                        changeCartesianScale(newType)
                    }}
                    value={cartesianScale[axis]?.title.font.weight}
                    defaultValue={cartesianScale[axis]?.title.font.weight}
                    >
                    <SelectTrigger>
                        <SelectValue placeholder ='Select axis type'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Font weight</SelectLabel>
                            <SelectItem value='normal'>Normal</SelectItem>
                            <SelectItem value='lighter'>Lighter</SelectItem>
                            <SelectItem value='bold'>Bold</SelectItem>
                            <SelectItem value='bolder'>Bolder</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-1/2">
                <Select
                        onValueChange={(value) => {
                            const newType = { ...cartesianScale }
                            newType[axis].title.align = value
                            changeCartesianScale(newType)
                        }}
                        value={cartesianScale[axis]?.title.align}
                        defaultValue={cartesianScale[axis]?.title.align}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder ='Select title align'/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Title align</SelectLabel>
                                <SelectItem value='start'>Start</SelectItem>
                                <SelectItem value='center'>Center</SelectItem>
                                <SelectItem value='end'>End</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            </div>

            <h5 className="text-sm mt-2">Range</h5>
            <div className="flex mt-1 ml-2 items-center">
                <Checkbox
                    id={'min'}
                    className='mr-2'
                    checked={cartesianScale[axis]?.min === null}
                    onCheckedChange={(checked) => {
                        const newScale = { ...cartesianScale }
                        if(checked) {
                            newScale[axis].min = null
                        } else {
                            const newVal = minRef.current.value
                            if(newVal === null || newVal === '') {
                                alert('Please input min number')
                                return
                            }

                            if(isNaN(newVal)) {
                                newScale[axis].min = null
                            } else {
                                newScale[axis].min = parseFloat(newVal)
                            }
                        }
                        changeCartesianScale(newScale)
                    }}
                />
                <Label htmlFor={'min'} className='font-bold hover:cursor-pointer mr-2'>Auto</Label>
                <Input
                    defaultValue = {cartesianScale[axis]?.min}
                    placeholder='Min number'
                    className='w-1/2'
                    ref={minRef}
                    type='number'
                ></Input>
            </div>
            <div className="flex mt-1 ml-2 items-center">
                <Checkbox
                    id={'max'}
                    className='mr-2'
                    checked={cartesianScale[axis]?.max === null}
                    onCheckedChange={(checked) => {
                        const newScale = { ...cartesianScale }
                        if(checked) {
                            newScale[axis].max = null
                        } else {
                            const newVal = maxRef.current.value
                            if(newVal === null || newVal === '') {
                                alert('Please input max number')
                                return
                            }

                            if(isNaN(newVal)) {
                                newScale[axis].max = null
                            } else {
                                newScale[axis].max = parseFloat(newVal)
                            }
                        }
                        changeCartesianScale(newScale)
                    }}
                />
                <Label htmlFor={'max'} className='font-bold hover:cursor-pointer mr-2'>Auto</Label>
                <Input
                    defaultValue = {cartesianScale[axis]?.max}
                    placeholder='Max number'
                    className='w-1/2'
                    ref={maxRef}
                    type='number'
                ></Input>
            </div>

            <h5 className="text-sm mt-2">Grid</h5>
            <div className="flex mt-1 ml-2 items-center">
                <Checkbox
                        id={'grid'}
                        className='mr-2'
                        checked={cartesianScale[axis]?.grid.display}
                        onCheckedChange={(checked) => {
                            const newGrid = { ...cartesianScale }
                            newGrid[axis].grid.display = checked
                            changeCartesianScale(newGrid)
                        }}
                    />
                <Label htmlFor={'grid'} className='font-bold hover:cursor-pointer mr-2'>{'Show ' + axis.toUpperCase() + ' grid'}</Label>

                <Popover
                    onOpenChange={(isOpen) => {
                        if(!isOpen) {
                            const newGrid = { ...cartesianScale }
                            newGrid[axis].grid.color = color.hex
                            changeCartesianScale(newGrid)
                        }
                    }}
                    >
                    <PopoverTrigger>
                        <Button variant="outline">
                            <div className="w-[20px] h-[20px] mr-2 border" style={{ backgroundColor: cartesianScale[axis].grid.color }}></div> Change color
                            </Button>
                        </PopoverTrigger>
                    <PopoverContent><ColorPicker color={color} onChange={setColor}/></PopoverContent>
                </Popover>
            </div>

            <h5 className="text-sm mt-2">Ticks</h5>
            <div className="flex mt-1 ml-2 items-center">
            <Popover
                    onOpenChange={(isOpen) => {
                        if(!isOpen) {
                            const newGrid = { ...cartesianScale }
                            newGrid[axis].ticks.color = color.hex
                            changeCartesianScale(newGrid)
                        }
                    }}
                    >
                    <PopoverTrigger>
                        <Button variant="outline">
                            <div className="w-[20px] h-[20px] mr-2 border" style={{ backgroundColor: cartesianScale[axis].ticks.color }}></div> Change color
                            </Button>
                        </PopoverTrigger>
                    <PopoverContent><ColorPicker color={color} onChange={setColor}/></PopoverContent>
                </Popover>
                <Input
                    defaultValue = {cartesianScale[axis]?.ticks.font.size}
                    onChange={() => {
                        const newGrid = { ...cartesianScale }
                        newGrid[axis].ticks.font.size = tickSizetRef.current.value
                        changeCartesianScale(newGrid)
                    }}
                    placeholder='Font size'
                    className='w-1/2 ml-2'
                    ref={tickSizetRef}
                    type='number'
                    min='0'
                />
            </div>
            
        </div>
    )
}