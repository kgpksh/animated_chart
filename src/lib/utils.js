import { BigChartTypes } from "@/app/chart-parts-provider"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const canStack = [BigChartTypes.BAR, BigChartTypes.LINE, BigChartTypes.SCATTERED]
export function isCartesian( chartType) {
  return canStack.includes(chartType)
}