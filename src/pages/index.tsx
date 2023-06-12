import { Button, Flex, Heading, Image, Text, Stack, useBreakpointValue } from '@chakra-ui/react';

import { signIn, signUp, requireNextAuth } from '@roq/nextjs';

import Head from 'next/head';
import { HelpBox } from 'components/help-box';

function HomePage() {
  return (
    <>
      <Head>
        <title>PeopleOS</title>

        <meta
          name="description"
          content="Discover PeopleOS: The Ultimate People Analytics Platform that empowers teams and business leaders to make data-driven decisions in attracting, hiring, retaining, and utilizing their most valuable asset - people. Integrating seamlessly with best-in-class HR and business systems for a powerful, holistic view of your organization."
        />
      </Head>

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack position="relative" spacing={6} w={'full'} maxW={'lg'}>
            <HelpBox />
            <Image src="/roq.svg" alt="Logo" w="150px" mb="8" />
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text as={'span'}>Explore</Text>{' '}
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'cyan.400',
                  zIndex: -1,
                }}
              >
                {`PeopleOS`}
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              {`Discover PeopleOS: The Ultimate People Analytics Platform that empowers teams and business leaders to make data-driven decisions in attracting, hiring, retaining, and utilizing their most valuable asset - people. Integrating seamlessly with best-in-class HR and business systems for a powerful, holistic view of your organization.`}
            </Text>

            <Text>organization</Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'cyan.500'}
                color={'white'}
                _hover={{
                  bg: 'cyan.700',
                }}
                onClick={() => signUp('business-owner')}
              >
                Create Account
              </Button>
              <Button rounded={'full'} onClick={() => signIn('business-owner')}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTc4OTJ8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBhbmFseXRpY3MlMkNIUnxlbnwwfHx8fDE2ODY1ODk3NjJ8MA&ixlib=rb-4.0.3&q=80&w=1080'
            }
          />
        </Flex>
      </Stack>
    </>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: true,
  redirectTo: '/users',
})(HomePage);
