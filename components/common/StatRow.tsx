
import { Flex, Text } from '@chakra-ui/react'

interface IStatRowProps {
  label: string;
  stat: string;
}

export const StatRow: React.FC<IStatRowProps> = (props: IStatRowProps) => {
  const { stat, label } = props;
  return (
    <Flex direction='row' justifyContent='space-between'>
      <Text fontSize='20px'>{label}</Text>
      <Text fontSize='20px'>{stat}</Text>
    </Flex>
  )
}