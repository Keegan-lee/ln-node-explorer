
import { Image, Flex } from '@chakra-ui/react'
const BTC = '/bitcoin-btc-logo.svg';

export const Loading: React.FC = () => {
  return (
    <Flex h='100vh' justifyContent='center' alignItems='center'>
      <Image className='loading' w='5rem' h='5rem' src={BTC} />
    </Flex>
  )
}