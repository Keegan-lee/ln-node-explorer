import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react'
import { GlobalLayout } from '../components/layouts/GlobalLayout'
import { useToast } from '@chakra-ui/react';
import { IErrorReturn, isPubKey } from '../utils/errorCheck';

export default function Home() {

  const [input, setInput] = useState('');
  const router = useRouter();
  const toast = useToast();

  const submit = () => {
    let check: IErrorReturn = isPubKey(input);
    if (check.success) router.push(`/${input}`);
    else toast({ status: 'error', description: check.message });
  }

  return (
    <GlobalLayout title='Home'>
      <Flex direction='column' justifyContent='center' alignItems='center' height='100vh'>
        <Text my='.5rem' >Welcome to the homepage. Enter a public key to explore the node in the lightning network.</Text>
        <Input width='50%' my='.5rem' placeholder='Node Public ID' type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <Button my='.5rem' type='submit' colorScheme='teal' onClick={submit}>Explore Node</Button>
      </Flex>
    </GlobalLayout>
  )
}