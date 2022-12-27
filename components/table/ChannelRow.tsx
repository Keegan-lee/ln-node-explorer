import { blocksToDaysAgo } from '../../utils/blocksToDaysAgo';
import { IChannel } from '../common/types';
import { Tr, Td } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { btcValueToString } from '../../utils/btcValueToString';
import { UNITS } from '../../utils/constants';

interface ChannelRowProps {
  channel: IChannel;
  options: any;
}

export const ChannelRow: React.FC<ChannelRowProps> = (props: ChannelRowProps) => {

  const router = useRouter();
  const { block_age, long_channel_id, short_channel_id, capacity, node1_pub, node2_pub, last_update } = props.channel;
  const { units } = props.options;

  return (
    <Tr key={long_channel_id}>
      <Td>{short_channel_id}</Td>
      <Td>{new Date(last_update * 1000).toDateString()}</Td>
      <Td>{blocksToDaysAgo(block_age).toFixed(0)} Days Old</Td>
      <Td>{btcValueToString(units, { amount: parseInt(capacity), units: UNITS.Satoshi })}</Td>
      <Td
        textOverflow='ellipsis'
        maxWidth='100px'
        overflow='hidden'
        style={{ whiteSpace: 'nowrap' }}
      >{node1_pub}</Td>
      <Td
        textOverflow='ellipsis'
        maxWidth='100px'
        overflow='hidden'
        style={{ whiteSpace: 'nowrap' }}
        cursor='pointer'
        _hover={{ textDecoration: 'underline', color: 'teal' }}
        onClick={() => router.push(`/${node2_pub}`)}
      >{node2_pub}</Td>
    </Tr>
  )
}