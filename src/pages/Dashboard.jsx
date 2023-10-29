import React from 'react'
import { LineChart, Card, Metric, Text, Title, Col, Grid, BadgeDelta, Flex } from '@tremor/react'


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

    const leftCards = {
        title: "2023 Revenue",
        metric: "£42,170.21",
        metricPrev: "£39,874.78",
        delta: "+7.66%",
        deltaType: "moderateIncrease",
      }



  const valueFormatter = (number) => `£ ${new Intl.NumberFormat("us").format(number).toString()}` 

  return (
    <div className='dark'>
      <div className='h-screen grid grid-cols-2 grid-rows-2'>
        <Grid numItems={4} className='gap-10 p-16'>
          <Col numColSpan={2}>
              <Card decoration='left' decorationColor='violet'>
                <Flex alignItems='start'>
                  <Text>{leftCards.title}</Text>
                  <BadgeDelta deltaType={leftCards.deltaType}>{leftCards.delta}</BadgeDelta>
                </Flex>
                <Flex justifyContent='start' alignItems='baseline' className='truncate space-x-6"'>
                  <Metric>{leftCards.metric}</Metric>
                  <Text className='truncate ml-2'>from {leftCards.metricPrev}</Text>
                </Flex>
              </Card>
          </Col> 
            <Col numColSpan={2}>
              <Card decoration='left' decorationColor='violet'>
                  <Text>2023 Orders</Text>
                  <Metric>1543</Metric>
                </Card>
              </Col>
            <Col numColSpan={2}>
              <Card decoration='left' decorationColor='violet'>
                <Text>2023 Avg Sale Price</Text>
                <Metric>£31.49</Metric>
              </Card>
            </Col>
            <Col numColSpan={2}>
              <Card decoration='left' decorationColor='violet'>
                <Text>2023 Sold via Promoted Listing</Text>
                <Metric>12.4%</Metric>
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
