import React from 'react';
import {Text, Link} from '@nextui-org/react';
import {Box} from './styles/box';
import dynamic from 'next/dynamic';
import {Flex} from './styles/flex';
import NextLink from 'next/link';
import {CardBalance1} from './usetage1';
import {CardBalance2} from './usetage2';
import {CardBalance3} from './usetage3';
// import {CardAgents} from './card-agents';
// import {CardTransactions} from './card-transactions';

const Chart = dynamic(
   () => import('./chart').then((mod) => mod.Steam),
   {
      ssr: true,
   }
);

export const Content = () => (
   <Box css={{overflow: 'hidden', height: '100%'}}>
      <Flex css={{ 'gap': '$8', 'pt': '$5', 'height': 'fit-content', 'flexWrap': 'wrap', '@lg': { flexWrap: 'nowrap', }, '@sm': { pt: '$10'}, }} justify={'center'} >
         <Flex css={{ 'px': '$12', 'mt': '$8', '@xsMax': {px: '$10'}, 'gap': '$12', }} direction={'column'} >
            <Box>
               <Text h3 css={{ 'textAlign': 'center', '@sm': { textAlign: 'inherit', }, }} >
                  ข้อมูล
               </Text>
               <Flex css={{ 'gap': '$10', 'flexWrap': 'wrap', 'justifyContent': 'center', '@sm': { flexWrap: 'nowrap', }, }} direction={'row'} >
                <CardBalance3 />
                <CardBalance1 />
                <CardBalance2 />
               </Flex>
            </Box>
            <Box>
               <Text h3 css={{ 'textAlign': 'center', '@lg': { textAlign: 'inherit', }, }} >
                  ภาพรวมข้อมูล
               </Text>
               <Box css={{ width: '100%', backgroundColor: '$accents0', boxShadow: '$lg', borderRadius: '$2xl', px: '$10', py: '$10', }} >
                  <Chart />
               </Box>
            </Box>
         </Flex>
      </Flex>
   </Box>
);