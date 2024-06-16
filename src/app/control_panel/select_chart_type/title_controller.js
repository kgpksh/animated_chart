"use client"

import chartController from "@/app/zustand_chart_controller"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRef } from "react"
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function TitleController() {
    const { title, changeTitle } = chartController()
    const titleRef = useRef(title.text)
    const sizeRef = useRef(title.font.size)
    let fontWeight = title.font.weight
    let position = title.position
    let align = title.align
    const [color, setColor] = useColor(title.color);
    return (
        <div className="flex flex-col">
            <div className="rounded-md border-2 p-3 mt-2">
                <div>
                    <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                        id={'checkTitle'}
                        checked={title.display}
                        onCheckedChange = {(value) => {
                            const newTitle = {...title}
                            newTitle.display = value
                            changeTitle(newTitle)
                        }}
                        />
                        <Label 
                        htmlFor={'checkTitle'}
                        className='font-bold hover:cursor-pointer'
                        >Use title</Label>
                    </div>
                    
                </div>
                <form className="flex flex-col mt-2" onSubmit={(e) => {
                    e.preventDefault()
                    const newTitle = {...title}
                    newTitle.text = titleRef.current.value
                    newTitle.font.size = sizeRef.current.value
                    newTitle.font.weight = fontWeight
                    newTitle.position = position
                    newTitle.align = align
                    changeTitle(newTitle)
                }}>
                    <Input
                        defaultValue={title.text}
                        placeholder='Write title here'
                        ref={titleRef}
                        type='text'
                    />
                    <div className="flex mt-3">
                        <Input
                            defaultValue={title.font.size}
                            placeholder='Size (max : 400)'
                            ref={sizeRef}
                            type='number'
                            min='0'
                            max='400'
                            className='mr-3'
                        />
                        <Select
                            onValueChange={(value) => fontWeight = value}
                            defaultValue={title.font.weight}
                            >
                            <SelectTrigger>
                                <SelectValue placeholder ='Select font type'/>
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
                    <div className="flex mt-3">
                        <div className="mr-3 w-1/2">
                            <Select
                                onValueChange={(value) => position = value}
                                defaultValue={title.position}
                                >
                                <SelectTrigger>
                                    <SelectValue placeholder ='Select position'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Position</SelectLabel>
                                        <SelectItem value='top'>Top</SelectItem>
                                        <SelectItem value='left'>Left</SelectItem>
                                        <SelectItem value='right'>Right</SelectItem>
                                        <SelectItem value='bottom'>Bottom</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/2 mr-2">
                            <Select
                                onValueChange={(value) => align = value}
                                defaultValue={title.align}
                                >
                                <SelectTrigger>
                                    <SelectValue placeholder ='Select align'/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Align</SelectLabel>
                                        <SelectItem value='start'>Start</SelectItem>
                                        <SelectItem value='center'>Center</SelectItem>
                                        <SelectItem value='end'>End</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Popover
                        onOpenChange={(isOpen) => {
                            if(!isOpen) {
                                const newTitle = {...title}
                                newTitle.color = color.hex
                                changeTitle(newTitle)
                            }
                        }}
                        >
                            <PopoverTrigger>
                                <Button variant="outline">
                                    <div className="w-[20px] h-[20px] mr-2 border" style={{ backgroundColor: title.color }}></div> Change color
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent><ColorPicker color={color} onChange={setColor}/></PopoverContent>
                    </Popover>
                        
                    </div>
                    <Button className='mt-3' disabled={!(title.display)}>Apply Title</Button>
                </form>
            </div>
        </div>
    )
}