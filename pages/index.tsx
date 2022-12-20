import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { Loading } from '../components/common/Loading';
import { GlobalLayout } from '../components/layouts/GlobalLayout'

export default function Home() {

  const [input, setInput] = useState('');
  const router = useRouter();

  return (
    <GlobalLayout title='Home'>
      <Flex direction='column' justifyContent='center' alignItems='center' height='100vh'>
        <Text my='.5rem' >Welcome to the homepage. Enter a public key to explore the node in the lightning network.</Text>
        <Input my='.5rem' placeholder='Node Public ID' type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <Button my='.5rem' type='submit' colorScheme='teal' onClick={() => router.push(`/${input}`)}>Explore Node</Button>
      </Flex>
    </GlobalLayout>
  )
}
