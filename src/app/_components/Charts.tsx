"use client"

import "@/app/globals.css"
import * as React from "react"
import { ChartBarRigh } from "./Charts/barRightBar"
import { ChartBarMultiple } from "./Charts/chartUpBar"
import { ChartPieInteractive } from "./Charts/pieChartSelect"
import { ChartRadialStacked } from "./Charts/chartRadialStacked"
import { ChartBarInteractive } from "./Charts/chartBarInteractive"
import { ChartAreaInteractive } from "./Charts/chartAreaInteractive"

export function Charts() {

  return (
    <div className="mt-5 flex flex-col gap-5">
      <div className="flex gap-5">
        {/* Card Section 01 */}   
        <ChartPieInteractive />
        
        {/* Card Section 02 */}
        <ChartBarMultiple />

        {/* Card Section 03 */}
        <ChartRadialStacked />

        {/* Card Section 04 */}
        <ChartBarRigh />
      </div>

      <div className="flex gap-2">
        <ChartAreaInteractive />
        <ChartBarInteractive />
      </div>
    </div>
  )
}
