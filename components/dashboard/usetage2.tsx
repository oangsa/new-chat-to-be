import {Card, Text, useTheme} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { IconArrowDownRight, IconArrowUpLeft } from '@tabler/icons-react';
export const CardBalance2 = () => {
    const {theme} = useTheme();
    const primary = "#0072F5";
    const secondary = "#7828C8";
    const primarylight = '#ecf2ff';
    const secondarylight = '#f5fcff';
    const optionscolumnchart: any = {
    chart: {
        type: 'area',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
        show: false,
        },
        height: 60,
        sparkline: {
        enabled: true,
        },
        group: 'sparklines',
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    fill: {
        colors: [secondarylight],
        type: 'solid',
        opacity: 0.05,
    },
    markers: {
        size: 0,
    },
    };
    const seriescolumnchart: any = [
    {
        name: '',
        color: secondary,
        data: [25, 66, 20, 40, 12, 58, 20],
    },
    ];

    const [data, setData] = useState({
    curTotal: 0,
    curDay:  0,
    curMonth: 0,

    oldDay: 0,
    oldMonth: 0,
    })

    const getD = async () => {
        const res = await fetch("/api/usetage/getUsetage")
        const data = await res.json()
        setData(data)
        console.log(data)
    }

    useEffect(() => {
        getD()
    }, [])
    
    const more = data.curMonth === 0 ? 1 : data.oldMonth
    const less = data.curMonth === 0 ? 1 : data.oldMonth
    return (
        <Card css={{ mw: '375px', bg: 'white', borderRadius: '$xl', px: '$6', }} >
            <Card.Body css={{py: '$10'}}>
                <Flex css={{gap: '$5'}}>
                    <Flex direction={'column'}>
                        <Text span css={{color: 'black'}}>
                            การเข้าใช้งานรายเดือน
                        </Text>
                    </Flex>
                </Flex>
                <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
                    <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
                </Flex>
                <Flex css={{gap: '$12'}} align={'center'}>
                    <Text span css={{color: 'black'}} size={'$lg'}>
                        เข้าใช้งาน {data.curMonth} ครั้ง
                    </Text>
                    <Text span css={{color: '$green600'}} size={'$md'}>
                        { data.curMonth > data.oldMonth ?
                            <div className='flex items-center'>
                                <IconArrowUpLeft width={30} color="#39B69A" className='mr-2'/>
                                {(((data.curMonth - data.oldMonth) / more ) * 100).toFixed(2)}%
                            </div> 
                            :
                            <div className='flex items-center text-red-600'>
                                <IconArrowDownRight width={30} color="#FA896B" className='mr-2'/>
                                {(((data.oldMonth - data.curMonth) / less) * 100).toFixed(2)}%
                            </div>
                        } 
                    </Text>
                </Flex>
            </Card.Body>
        </Card>
    );
};