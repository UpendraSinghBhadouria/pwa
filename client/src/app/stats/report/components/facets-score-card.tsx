"use client"

import Card from "./card"
import {
  ChartData,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js"
import { Radar } from "react-chartjs-2"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

type FacetsScoreCardProps = {
  heading: string
  subHeading: string
  info?: string
  facetsScoreGraphConfig: ChartData<"radar", (number | null)[], unknown>
}

const FacetsScoreCard = ({
  heading,
  subHeading,
  info,
  facetsScoreGraphConfig,
}: FacetsScoreCardProps) => {
  return (
    <Card heading={heading} subHeading={subHeading} info={info}>
      <Radar data={facetsScoreGraphConfig} />
    </Card>
  )
}

export default FacetsScoreCard
