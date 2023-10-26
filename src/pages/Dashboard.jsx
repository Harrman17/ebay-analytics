import React from 'react'
import { LineChart, Card, Title } from '@tremor/react'

export default function Dashboard() {

  const chartdata = [
    {
      month: "January",
      "revenue": 3123.11  
    },
    {
      month: "February",
      "revenue": 3476.87
    },
    {
      month: "March",
      "revenue": 2913.90
    },
    {
      month: "April",
      "revenue": 3364.43
    },
    {
      month: "May",
      "revenue": 2164.02
    },
    {
      month: "June",
      "revenue": 3901.34
    },
    {
      month: "July",
      "revenue": 4064.11
    },
    {
      month: "August",
      "revenue": 4104.52
    },
    {
      month: "September",
      "revenue": 3564.32
    },
    {
      month: "October",
      "revenue": 3864.12
    },
    {
      month: "November",
      "revenue": 3900.41
    },
    {
      month: "December",
      "revenue": 4402.98
    },
  ];

  const valueFormatter = (number) => `£ ${new Intl.NumberFormat("us").format(number).toString()}` 

  return (
    <div>
      <div className='flex justify-center'>
        <Card className='mt-6 w-[1000px]'>
          <Title>2023 Total Monthly Revenue</Title>
          <LineChart 
            className="mt-6 w-[800px]"
            data={chartdata}
            index="month"
            categories={["revenue"]}
            colors={["purple"]}
            valueFormatter={valueFormatter}
            yAxisWidth={50}
          />
        </Card>
      </div>
    </div>
  )
}
