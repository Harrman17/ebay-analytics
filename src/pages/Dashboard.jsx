import React, {useState, useEffect} from 'react'
import { LineChart, Card, Metric, Text, Title, Col, Grid, BadgeDelta, Flex, DonutChart, BarChart, TabGroup, TabList, Tab, TabPanels, TabPanel, ProgressCircle, TextInput} from '@tremor/react'
import { barChartData } from './barChartData';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Dashboard() {

  const chartdata = [
    {
      month: "Jan",
      "Revenue": 3123.11  
    },
    {
      month: "Feb",
      "Revenue": 3476.87
    },
    {
      month: "March",
      "Revenue": 2913.90
    },
    {
      month: "April",
      "Revenue": 3364.43
    },
    {
      month: "May",
      "Revenue": 2164.02
    },
    {
      month: "June",
      "Revenue": 3901.34
    },
    {
      month: "July",
      "Revenue": 4064.11
    },
    {
      month: "Aug",
      "Revenue": 4104.52
    },
    {
      month: "Sept",
      "Revenue": 3564.32
    },
    {
      month: "Oct",
      "Revenue": 3864.12
    },
    {
      month: "Nov",
      "Revenue": 3900.41
    },
    {
      month: "Dec",
      "Revenue": 4402.98
    },
  ];

    const leftCards = {
        title: "2023 Revenue",
        metric: 42170.21,
        metricPrev: 39874.78,
        delta: "+7.66%",
        deltaType: "moderateIncrease",
      }

    const donutChartData = [
        {
          SKU: "B003TL048U",
          Sales: 155,
        },
        {
          SKU: "B07LGDFR1X",
          Sales: 245,
        },
        {
          SKU: "B08FTBNNY2",
          Sales: 120,
        },
        {
          SKU: "B08FC3KV21",
          Sales: 75,
        },
        {
          SKU: "B07W4DGVQF",
          Sales: 90,
        },
        {
          SKU: "B001G7P62S",
          Sales: 70,
        },
        {
          SKU: "B08319XH53",
          Sales: 50,
        },
        {
          SKU: "B07V9G9F3M",
          Sales: 80,
        },
        {
          SKU: "B09YTNP6JV",
          Sales: 120,
        },
        {
          SKU: "B01DJVVORE",
          Sales: 138,
        },
      ];


  const valueFormatter = (number) => `£ ${new Intl.NumberFormat("us").format(number).toString()}` 

  let maxcurrSales = 0
  const donutValueFormatter = () => {
    for (const item of donutChartData) {
      if (item.Sales > maxcurrSales) {
        maxcurrSales = item.Sales
        return item.SKU
      }
    }
    }  

    const [revGoal, setrevGoal] = useState()
    const [displayedGoal, setDisplayedGoal] = useState(0)

    const handleInputText = (e) => {
      let inputValue = e.target.value.replace(/[^0-9]/g, '') //ensures no letters are inputted
      if (inputValue <= 2000000) {
      setrevGoal(inputValue)
      }
    };

    const [percentageAchieved, setPercentageAchieved] = useState(0)

    const calcGoalPercentage = () => {
      const actualAmount = leftCards.metric
      const revGoalNumber = parseInt(revGoal)
      setPercentageAchieved(actualAmount/revGoalNumber*100)
      setDisplayedGoal(revGoal)
    }

    const personalValueFormatter = (value)  => {
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP"
      }).format(value)
    }

    useEffect(() => {
      setrevGoal('')
    }, [displayedGoal])


  return (
    <div className='dark'>
      <div className='h-screen grid grid-cols-2 grid-rows-2'>
        <Grid numItems={4} className='gap-10 p-12'>
          <Col numColSpan={2}>
              <Card decoration='left' decorationColor='violet'>
                <Flex alignItems='start'>
                  <Text>{leftCards.title}</Text>
                  <BadgeDelta deltaType={leftCards.deltaType}>{leftCards.delta}</BadgeDelta>
                </Flex>
                <Flex justifyContent='start' alignItems='baseline' className='truncate space-x-6"'>
                  <Metric>{personalValueFormatter(leftCards.metric)}</Metric>
                  <Text className='truncate ml-2'>from {personalValueFormatter(leftCards.metricPrev)}</Text>
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
        <div className='flex justify-center p-1 pt-2'>
          <Card className='w-11/12'>
            <Title>2023 Total Monthly Revenue</Title>
            <LineChart 
              className='h-64 screen2:h-[360px]'
              data={chartdata}
              index="month"
              categories={["Revenue"]}
              colors={["violet"]}
              valueFormatter={valueFormatter}
              yAxisWidth={55}
              showAnimation={true}
            />
          </Card>
        </div>
        <div className='p-12'>
          <Grid numItems={2} className='gap-10'>
            <Card >
              <Title>Top Performing SKUs</Title>
                <DonutChart 
                className='mt-6 screen2:h-60'
                data={donutChartData}  
                category="Sales"
                index='SKU'
                colors={["purple","cyan","teal","rose","indigo","pink","violet","amber","fuchsia","sky"]}
                valueFormatter={donutValueFormatter}
                showAnimation={true}
                />
            </Card>
            <Card className='flex flex-col justify-center'>
                <Text className='mb-8' color='white'>2023 Revenue Goal: {personalValueFormatter(displayedGoal)}</Text>
                <ProgressCircle radius={100} strokeWidth={19} value={percentageAchieved} color='violet' showAnimation={true}>
                  <span className='text-white'>
                    {personalValueFormatter(leftCards.metric)}
                  </span>
                </ProgressCircle>
                <div className='flex flex-row mt-10'>
                  <TextInput className='inline w-11/12 mr-2' type='text' placeholder='Set your goal' value={revGoal} onChange={handleInputText}/>
                  <button className='inline h-9 w-6 rounded-md bg-accent' onClick={calcGoalPercentage}>
                  <FontAwesomeIcon icon={faCheck} className='text-white'/>
                  </button>
                </div>
            </Card>
          </Grid>
        </div>
        <div className='flex justify-center p-1 mb-1'>
          <Card className='w-11/12'>
            <Title>2023 Daily Sales</Title>
            <TabGroup>
              <TabList>
                <Tab>Jan</Tab>
                <Tab>Feb</Tab>
                <Tab>March</Tab>
                <Tab>April</Tab>
                <Tab>May</Tab>
                <Tab>June</Tab>
                <Tab>July</Tab>
                <Tab>Aug</Tab>
                <Tab>Sept</Tab>
                <Tab>Oct</Tab>
                <Tab>Nov</Tab>
                <Tab>Dec</Tab>
              </TabList>
              <TabPanels>
                <TabPanel> {/*each tab panel is in order - so first tab is Jan then Feb etc..*/}
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel>
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel>
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel>
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel> 
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel>
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel>
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel>
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel> 
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel> 
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel>
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
                <TabPanel> 
                  <BarChart 
                  className='h-64 screen2:h-[360px]'
                  data={barChartData}
                  index="name"
                  categories={["Daily Revenue"]}
                  colors={["violet"]}
                  valueFormatter={valueFormatter}
                  showAnimation={true}/>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        </div>
      </div>
    </div>
  )
}


