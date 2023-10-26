import React from 'react'
import { LineChart, Card, Metric, Text, Title, Col, Grid } from '@tremor/react'

export default function Dashboard() {

  const chartdata = [
    {
      month: "Jan",
      "revenue": 3123.11  
    },
    {
      month: "Feb",
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
      month: "Aug",
      "revenue": 4104.52
    },
    {
      month: "Sept",
      "revenue": 3564.32
    },
    {
      month: "Oct",
      "revenue": 3864.12
    },
    {
      month: "Nov",
      "revenue": 3900.41
    },
    {
      month: "Dec",
      "revenue": 4402.98
    },
  ];

  const valueFormatter = (number) => `£ ${new Intl.NumberFormat("us").format(number).toString()}` 

  return (
    <div >
      <div className='h-screen grid grid-cols-2 grid-rows-2'>
        <Grid numItems={2} className='gap-4 p-10'>
            <Col numColSpan={1}>
              <Card decoration='left' decorationColor='violet'>
                <Text>2023 Revenue</Text>
                <Metric>£42,170.21</Metric>
              </Card>
            </Col>
            <Col>
              <Card decoration='left' decorationColor='violet'>
                  <Text>2023 Sales</Text>
                  <Metric>983</Metric>
                </Card>
              </Col>
        </Grid>
        <div className='flex justify-center p-4'>
          <Card className='w-11/12'>
            <Title>2023 Total Monthly Revenue</Title>
            <LineChart 
              className='h-64 screen2:h-[360px]'
              data={chartdata}
              index="month"
              categories={["revenue"]}
              colors={["violet"]}
              valueFormatter={valueFormatter}
              yAxisWidth={55}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
