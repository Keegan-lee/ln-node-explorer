import { useState } from 'react';
import { NextPage } from 'next';
import { Flex, Text, Divider, Table, TableContainer, Thead, Tbody, Tr, Th, Button } from '@chakra-ui/react';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { PAGINATION } from '../../graphql/queries/pagination';
import { GlobalLayout } from '../../components/layouts/GlobalLayout';
import { useEffect } from 'react';
import { Loading } from '../../components/common/Loading';
import { StatRow } from '../../components/common/StatRow';
import { SYMBOLS, UNITS } from '../../utils/constants';
import { ChannelRow } from '../../components/table/ChannelRow';
import { IChannel } from '../../components/common/types';
import { satsToBTC } from '../../utils/btcConverstions';
import { btcValueToString } from '../../utils/btcValueToString';
import { BIG } from '../../style/font';

interface IStats {
  capacity: number;
  numChannels: number;
  avgFeeMSats: string;
  avgBaseFee: string;
};

const PubKey: NextPage = () => {

  const router = useRouter();
  const { pubkey } = router.query;

  const [stats, setStats] = useState<IStats>({
    numChannels: 0,
    capacity: 0,
    avgFeeMSats: '0',
    avgBaseFee: '0'
  });

  const [channelPagination, setChannelPagination] = useState({ offset: 0, limit: 10 });

  const [currentUnit, setCurrentUnit] = useState(UNITS.Bitcoin);

  const [pagination, { loading, error, data }] = useLazyQuery(PAGINATION,
    {
      variables:
      {
        pubkey,
        page: { limit: 0, offset: 0 },
        order: { by: 'chan_id', direction: 'ASC' }
      }
    }
  );

  useEffect(() => {
    if (pubkey !== null) {
      pagination();
    }
  }, [pubkey]);

  useEffect(() => {
    if (data === undefined) return;
    calculateStats();
  }, [data])

  const calculateStats = () => {
    let capacity: number = 0; // Stored in BTC
    let avgFeeMSats: number = 0; // Stored in Sats
    let avgBaseFee: number = 0;

    const numChannels: number = data.getNode.graph_info.channels.channel_list.list.length

    data.getNode.graph_info.channels.channel_list.list.map((channel: IChannel, index: number) => {
      capacity = satsToBTC(parseInt(channel.capacity)) + capacity;
      avgFeeMSats += parseFloat(channel.node1_policy.fee_rate_milli_msat);
      avgBaseFee += parseFloat(channel.node1_policy.fee_base_msat);
    });

    avgFeeMSats /= numChannels;
    avgBaseFee /= numChannels;

    setStats({
      ...stats,
      numChannels,
      avgFeeMSats: (avgFeeMSats / 1000).toFixed(4),
      avgBaseFee: (avgBaseFee / 1000).toFixed(0),
      capacity
    });
  }

  const channelPageBack = () => {
    const { offset, limit } = channelPagination;
    const newOffset = offset - limit >= 0 ? offset - limit : 0;
    setChannelPagination({ ...channelPagination, offset: newOffset })
  }

  const channelPageForward = () => {
    const { offset, limit } = channelPagination;
    const { numChannels } = stats;
    const newOffset = offset + limit;
    if (newOffset > numChannels) return;

    setChannelPagination({ ...channelPagination, offset: newOffset })
  }

  if (loading || data === undefined) return <Loading />;
  if (error) return <Flex direction='row' textAlign='center' justifyContent='center'>Error : {error.message}</Flex>;

  console.log(data);

  return (
    <GlobalLayout title='Node'>
      {
        data?.getNode &&

        <Flex direction='column'>

          <Flex mb='1rem' direction={{ base: 'column', lg: 'row' }} justifyContent='flex-start' alignContent='center' alignItems='center'>
            <Text textAlign='left' fontSize='2rem' mr='1rem'>Node:</Text>
            <Text overflow='hidden' textOverflow='ellipsis' maxWidth='100%' style={{ whiteSpace: 'nowrap' }} fontSize={BIG} fontStyle='italic'>{pubkey}</Text>

            <Flex direction='row' justifyContent='center' alignItems='center' position={{ base: 'relative', lg: 'absolute' }} right='1rem'>
              <Text fontSize='24px' pr='1rem'>Units:</Text>
              <Button border='1px solid lightGrey' color={currentUnit === UNITS.Satoshi ? 'white' : 'black'} onClick={() => setCurrentUnit(UNITS.Satoshi)} colorScheme={currentUnit === UNITS.Satoshi ? 'teal' : ''}>Satoshis</Button>
              <Button border='1px solid lightGrey' color={currentUnit === UNITS.Bitcoin ? 'white' : 'black'} onClick={() => setCurrentUnit(UNITS.Bitcoin)} colorScheme={currentUnit === UNITS.Bitcoin ? 'teal' : ''}>Bitcoin</Button>
            </Flex>
          </Flex>

          <Flex direction={{ base: 'column', lg: 'row' }}>
            <Flex direction='column' flex='1' border='1px dotted black' p='1rem'>
              <Text fontSize='24px' mb='.5rem'>At a Glance</Text>

              <Divider my='.5rem' w='100%' />

              <Text textAlign='center'>Channels & Capacity</Text>

              <StatRow
                label='# of Channels'
                stat={String(stats.numChannels)}
              />

              <StatRow
                label='Total Capacity'
                stat={btcValueToString(currentUnit, { amount: stats.capacity, units: UNITS.Bitcoin }, true)}
              />

              <Divider my='.5rem' w='100%' />

              <Text textAlign='center'>Fees</Text>

              <StatRow
                label='Avg Base Fee'
                stat={`${stats.avgBaseFee} ${SYMBOLS.SATOSHI}`}
              />

              <StatRow
                label='Avg Fee mSats'
                stat={`${stats.avgFeeMSats} %`}
              />

              <Divider my='.5rem' w='100%' />

            </Flex>

            <Flex p='1rem 0 0 1rem' flex='2' wrap='wrap'>
              <Text mb='1rem' fontSize='24px' w='100%'>Node Channels ({channelPagination.offset} - {channelPagination.offset + channelPagination.limit})</Text>

              <TableContainer shadow='lg'>
                <Table variant='striped'>
                  <Thead>
                    <Tr>
                      <Th>Channel ID</Th>
                      <Th>Last Update</Th>
                      <Th>Channel Age</Th>
                      <Th>Capacity</Th>
                      <Th>Node A Pub</Th>
                      <Th>Node B Pub</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      data?.getNode.graph_info.channels.channel_list.list.map(
                        (channel: IChannel) => <ChannelRow key={channel.long_channel_id} channel={channel} options={{ units: currentUnit }} />
                      ).slice(channelPagination.offset, channelPagination.offset + channelPagination.limit)
                    }
                  </Tbody>
                </Table>

                <Flex p='1rem' direction='row' justifyContent='space-between' alignItems='center'>
                  <Text cursor='pointer' onClick={() => channelPageBack()}>Prev</Text>
                  <Text cursor='pointer' onClick={() => channelPageForward()}>Next</Text>
                </Flex>

              </TableContainer>
            </Flex>
          </Flex>

          <Flex mt='2rem' direction='row' wrap='wrap'>


          </Flex>
        </Flex>
      }
    </GlobalLayout>
  )
}

export default PubKey;