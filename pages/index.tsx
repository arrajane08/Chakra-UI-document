import {
  Box,
  BoxProps,
  Button,
  Center,
  chakra,
  Circle,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  LightMode,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { chunk } from '@chakra-ui/utils'
import users from 'chakra-users'
import { AdBanner } from 'components/chakra-pro/ad-banner'
import { ChakraProAd } from 'components/chakra-pro/home-page-ad'
import Container from 'components/container'
import DiscordStrip from 'components/discord-strip'
import { Footer } from 'components/footer'
import Header from 'components/header'
import SEO from 'components/seo'
import TweetCard from 'components/tweet-card'
import tweets from 'configs/tweets.json'
import NextLink from 'next/link'
import * as React from 'react'
import { AiFillThunderbolt } from 'react-icons/ai'
import { DiGithubBadge } from 'react-icons/di'
import { FaArrowRight, FaDiscord, FaMicrophone } from 'react-icons/fa'
import { FiDownload, FiGithub, FiUsers } from 'react-icons/fi'
import { IoMdMoon } from 'react-icons/io'
import { MdAccessibility, MdGrain, MdPalette } from 'react-icons/md'
import type { Member, Sponsor } from 'src/types/github'
import { getAllContributors } from 'utils/get-all-contributors'
import { getAllMembers } from 'utils/get-all-members'
import { getAllSponsors } from 'utils/get-all-sponsors'
import { getGithubStars } from 'utils/get-github-stars'
import { t } from 'utils/i18n'
import { default as NextImage } from 'next/image'
import ChakraNextImage from 'components/chakra-next-image'

const NextChakraImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader ',
      'loading',
    ].includes(prop),
})

const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      rounded='12px'
      shadow='base'
      p='40px'
      {...props}
    >
      <Flex
        rounded='full'
        w='12'
        h='12'
        bg='teal.500'
        align='center'
        justify='center'
      >
        <Icon fontSize='24px' color='white' as={icon} />
      </Flex>
      <Heading as='h3' size='md' fontWeight='semibold' mt='1em' mb='0.5em'>
        {title}
      </Heading>
      <Text fontSize='lg' opacity={0.7}>
        {children}
      </Text>
    </Box>
  )
}

interface StatBoxProps extends BoxProps {
  icon?: React.ElementType
  title: string
  description: string
}

const StatBox = (props: StatBoxProps) => {
  const { icon: StatIcon, title, description, ...rest } = props
  return (
    <Flex
      direction='column'
      align={{ base: 'center', md: 'flex-start' }}
      pl={{ base: '0', md: '8' }}
      borderLeft='2px solid'
      borderLeftColor='yellow.200'
      {...rest}
    >
      <Box fontSize={{ base: '4rem', md: '6rem' }} lineHeight='1em' mb='20px'>
        {title}
      </Box>
      <Stack isInline align='center'>
        <StatIcon size='24px' />
        <Text>{description}</Text>
      </Stack>
    </Flex>
  )
}

interface HomePageProps {
  members: Member[]
  githubStars: string
  sponsors: {
    companies: Sponsor[]
    individuals: Sponsor[]
  }
}

const HomePage = ({ members, sponsors, githubStars }: HomePageProps) => {
  return (
    <>
      <SEO
        title={t('homepage.seo.title')}
        description={t('homepage.seo.description')}
      />
      <AdBanner />
      <Header />
      <Box mb={20}>
        <Box as='section' pt='6rem' pb={{ base: '0', md: '5rem' }}>
          <Container>
            <Box textAlign='center'>
              <chakra.h1
                maxW='16ch'
                mx='auto'
                fontSize={{ base: '2.25rem', sm: '3rem', lg: '4rem' }}
                fontFamily='heading'
                letterSpacing='tighter'
                fontWeight='extrabold'
                mb='16px'
                lineHeight='1.2'
              >
                {t('homepage.title.main')}
                <Box
                  as='span'
                  color={useColorModeValue('teal.500', 'teal.300')}
                >
                  {' '}
                  {t('homepage.title.highlighted')}
                </Box>
              </chakra.h1>

              <Text
                maxW='560px'
                mx='auto'
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={{ base: 'lg', lg: 'xl' }}
                mt='6'
              >
                {t('homepage.message')}
              </Text>

              <Stack
                mt='10'
                spacing='4'
                justify='center'
                direction={{ base: 'column', sm: 'row' }}
              >
                <NextLink href='/docs/getting-started' passHref>
                  <Button
                    h='4rem'
                    px='40px'
                    fontSize='1.2rem'
                    as='a'
                    size='lg'
                    colorScheme='teal'
                    rightIcon={<FaArrowRight fontSize='0.8em' />}
                  >
                    {t('homepage.get-started')}
                  </Button>
                </NextLink>
                <Button
                  as='a'
                  size='lg'
                  h='4rem'
                  px='40px'
                  fontSize='1.2rem'
                  href='https://github.com/chakra-ui/chakra-ui/'
                  target='__blank'
                  leftIcon={<DiGithubBadge size='1.5em' />}
                >
                  GitHub
                </Button>
              </Stack>
            </Box>

            <Center>
              <Box
                display='inline-block'
                mt='70px'
                rounded='xl'
                bg='green.50'
                shadow='base'
                px='6'
                py='4'
              >
                <ChakraNextImage
                  height={55}
                  width={240}
                  src='/git-nation-badge.png'
                />
              </Box>
            </Center>
          </Container>
        </Box>

        <Divider />

        <Box as='section' pt='48px' pb='32px'>
          <Container textAlign='center'>
            <chakra.p
              fontWeight='500'
              textStyle='caps'
              color={useColorModeValue('teal.600', 'teal.300')}
              mb='48px'
            >
              {t('homepage.supported-and-backed-by')}
            </chakra.p>
            <Wrap
              maxW='800px'
              mx='auto'
              justify='center'
              align='center'
              spacing='24px'
            >
              {users
                .filter((user) => user.image.includes('.'))
                .map((user) => (
                  <WrapItem key={user.name} bg='white' p='5' rounded='md'>
                    <ChakraNextImage
                      key={user.image}
                      alt={user.name}
                      height={24}
                      width={120}
                      src={user.image}
                      loading='lazy'
                    />
                  </WrapItem>
                ))}
              <Box
                p='4'
                border='1px dashed'
                borderColor={useColorModeValue('teal.200', 'teal.500')}
                bg={useColorModeValue('teal.50', 'whiteAlpha.200')}
                rounded='md'
              >
                <Box as='span' mr='1' role='img'>
                  💖
                </Box>{' '}
                {t('homepage.your-company')}
              </Box>
            </Wrap>
          </Container>
        </Box>

        <Box as='section'>
          <Container py='80px'>
            <Box mb='3em' textAlign='center'>
              <chakra.h2 textStyle='heading'>
                {t('homepage.less-code-more-speed')}
              </chakra.h2>
              <Text opacity={0.7} fontSize='lg' mt='3' mx='auto' maxW='600px'>
                {t('homepage.less-code-description')}
              </Text>
            </Box>
            <Box
              maxW='7xl'
              mx='auto'
              mb='-300px'
              px={{ base: '4', md: 0 }}
              position='relative'
            >
              <Box
                as='iframe'
                tabIndex={-1}
                src='https://codesandbox.io/embed/homepage-s7pkh?codemirror=1&fontsize=12&hidenavigation=1&theme=dark'
                style={{
                  width: '100%',
                  background: 'white',
                  height: '600px',
                  border: '0',
                  borderRadius: 8,
                  overflow: 'hidden',
                  position: 'static',
                  zIndex: 0,
                }}
                shadow='2xl'
                title='Chakra Playground'
                allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
                sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts'
              />
            </Box>
          </Container>
        </Box>

        <Box
          as='section'
          pt='240px'
          bg={useColorModeValue('gray.50', 'gray.900')}
        >
          <Container py='120px' maxW='1280px'>
            <Box maxW='760px' mx='auto' textAlign='center' mb='56px'>
              <chakra.h2 textStyle='heading' mb='5'>
                {t('homepage.feature-section.title')}
              </chakra.h2>
              <chakra.p opacity={0.7} fontSize='lg'>
                {t('homepage.feature-section.description')}
              </chakra.p>
            </Box>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
              gap={10}
              px={{ md: 12 }}
            >
              <Feature
                icon={MdAccessibility}
                title={t('homepage.feature-section.accessible.title')}
              >
                {t('homepage.feature-section.accessible.description')}
              </Feature>
              <Feature
                icon={MdPalette}
                title={t('homepage.feature-section.themeable.title')}
              >
                {t('homepage.feature-section.themeable.description')}
              </Feature>
              <Feature
                icon={MdGrain}
                title={t('homepage.feature-section.composable.title')}
              >
                {t('homepage.feature-section.composable.description')}
              </Feature>
              <Feature
                icon={IoMdMoon}
                title={t('homepage.feature-section.light-and-dark-ui.title')}
              >
                {t('homepage.feature-section.light-and-dark-ui.description')}
              </Feature>
              <Feature
                icon={AiFillThunderbolt}
                title={t('homepage.feature-section.developer-experience.title')}
              >
                {t('homepage.feature-section.developer-experience.description')}
              </Feature>
              <Feature
                icon={FaDiscord}
                title={t('homepage.feature-section.active-community.title')}
              >
                {t('homepage.feature-section.active-community.description')}
              </Feature>
            </Grid>
          </Container>
        </Box>

        <Box as='section' bg='teal.500'>
          <Container py='7.5rem' maxW='1280px' color='white'>
            <Box maxW='760px' mx='auto' textAlign='center' mb='56px'>
              <chakra.h2 textStyle='heading' mb='5'>
                {t('homepage.growing-section.title')}
              </chakra.h2>
              <chakra.p opacity={0.7} fontSize='lg'>
                {t('homepage.growing-section.description')}
              </chakra.p>
            </Box>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              maxW='880px'
              mx='auto'
              spacing='4rem'
              px={{ md: 12 }}
            >
              <StatBox
                icon={FiDownload}
                title='813K'
                description={t('homepage.growing-section.downloads-per-month')}
              />
              <StatBox
                icon={FiGithub}
                title={githubStars}
                description={t('homepage.growing-section.github-stars')}
              />
              <StatBox
                icon={FiUsers}
                title={members.length.toString()}
                description={t('homepage.growing-section.core-contributors')}
              />
              <StatBox
                icon={FaDiscord}
                title='5.1K'
                description={t('homepage.growing-section.discord-members')}
              />
            </SimpleGrid>

            <Box mt='5rem' textAlign='center'>
              <chakra.p mb='48px' textStyle='caps'>
                {t('homepage.growing-section.chakra-heroes')}
              </chakra.p>
              <Wrap spacing='4' justify='center' maxW='660px' mx='auto'>
                {members.map((i) => (
                  <WrapItem key={i.login}>
                    <ChakraNextImage
                      alt={i.name}
                      src={i.avatar_url}
                      width={80}
                      height={80}
                      rounded='full'
                      loading='lazy'
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>

        <Box>
          <Container py='120px' maxW='1200px' px='32px'>
            <chakra.h2 textStyle='heading-2' mb='48px'>
              {t('homepage.loved-by-product-people-section.title')}
            </chakra.h2>
            <SimpleGrid spacing='32px' columns={{ base: 1, md: 3 }}>
              {chunk(tweets.tweets, 3).map((tweetList, idx) => (
                <Stack spacing='6' key={idx}>
                  {tweetList.map((tweet: any, idx) => (
                    <TweetCard key={idx} {...tweet} />
                  ))}
                </Stack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box bg='teal.500'>
          <Container py='120px' maxW='1200px' px='32px' color='white'>
            <Box maxW='560px' mx='auto' textAlign='center' mb='56px'>
              <chakra.h2 textStyle='heading-2' mb='4'>
                {t('homepage.support-chakra-ui-section.title')}
              </chakra.h2>
              <Text fontSize='lg' opacity={0.7}>
                {t('homepage.support-chakra-ui-section.description')}
              </Text>
            </Box>

            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing='6'
              maxW='600px'
              mx='auto'
              bg='white'
              color='gray.800'
              shadow='md'
              rounded='lg'
              p='6'
            >
              <Stack flex='1' isInline spacing='6' pr={{ base: 0, md: '4' }}>
                <Icon h='40px' w='40px' viewBox='0 0 32 32'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M29.1531 6.8877C30.948 9.47379 31.9999 12.614 31.9999 16.0003C31.9999 19.3866 30.948 22.5271 29.1531 25.1129L25.0085 20.9684C25.8225 19.4957 26.2858 17.8019 26.2858 16.0003C26.2858 14.1987 25.8225 12.5052 25.0085 11.0325L29.1531 6.8877Z'
                    fill='#8FC7FF'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M25.1126 2.84685L20.9678 6.99138C19.4951 6.17745 17.8016 5.71417 16 5.71417C10.3194 5.71417 5.71418 10.3194 5.71418 16C5.71418 21.6806 10.3194 26.2858 16 26.2858C17.8016 26.2858 19.4951 25.8226 20.9678 25.0086L25.1126 29.1532C22.5265 30.948 19.3863 32 16 32C7.16352 32 0 24.8365 0 16C0 7.16351 7.16352 0 16 0C19.3863 0 22.5265 1.05197 25.1126 2.84685Z'
                    fill='#297EFF'
                  />
                </Icon>
                <Box flex='1'>
                  <Text fontSize='lg' fontWeight='bold' mt='-1'>
                    Open Collective
                  </Text>
                  <Text opacity={0.7}>
                    {t(
                      'homepage.support-chakra-ui-section.sponsor-the-chakra-ui-maintainers',
                    )}
                  </Text>
                </Box>
              </Stack>
              <LightMode>
                <Button
                  w={{ base: '100%', md: 'auto' }}
                  alignSelf='center'
                  as='a'
                  minW='7rem'
                  colorScheme='teal'
                  href='https://opencollective.com/chakra-ui'
                  rel='noopener'
                  target='_blank'
                >
                  Sponsor
                </Button>
              </LightMode>
            </Stack>

            <Stack
              direction={{ base: 'column', md: 'row' }}
              maxW='600px'
              mt='6'
              mx='auto'
              bg='white'
              color='gray.800'
              shadow='md'
              rounded='lg'
              p='6'
            >
              <Stack flex='1' isInline spacing='6' pr={{ base: 0, md: '4' }}>
                <Icon w='40px' h='40px' viewBox='0 0 569 546'>
                  <g>
                    <circle
                      cx='362.589996'
                      cy='204.589996'
                      r='204.589996'
                      fill='#f96854'
                    />
                    <rect
                      fill='#052d49'
                      height='545.799988'
                      width='100'
                      x='0'
                      y='0'
                    />
                  </g>
                </Icon>
                <Box flex='1'>
                  <Text fontSize='lg' fontWeight='bold' mt='-1'>
                    Patreon
                  </Text>
                  <Text opacity={0.7}>
                    {t(
                      'homepage.support-chakra-ui-section.sponsor-the-creator',
                    )}
                  </Text>
                </Box>
              </Stack>
              <LightMode>
                <Button
                  w={{ base: '100%', md: 'auto' }}
                  alignSelf='center'
                  as='a'
                  minW='7rem'
                  colorScheme='teal'
                  href='https://www.patreon.com/segunadebayo'
                  rel='noopener'
                  target='_blank'
                >
                  Sponsor
                </Button>
              </LightMode>
            </Stack>

            <Box maxW='600px' mx='auto' textAlign='center'>
              <chakra.p textStyle='caps' mb='8' mt='4rem'>
                {t('homepage.support-chakra-ui-section.organization-sponsors')}
              </chakra.p>
              <Wrap justify='center'>
                {sponsors.companies.map((i) => (
                  <WrapItem key={i.MemberId}>
                    <Circle
                      as='a'
                      href={i.website}
                      target='_blank'
                      rel='noopener'
                      size='80px'
                      bg='white'
                      shadow='lg'
                    >
                      <ChakraNextImage
                        rounded='full'
                        width={56}
                        height={56}
                        alt={i.name}
                        key={i.MemberId}
                        src={i.image}
                        loading='lazy'
                      />
                    </Circle>
                  </WrapItem>
                ))}
              </Wrap>

              <chakra.p mb='8' mt='4rem' textStyle='caps'>
                {t('homepage.support-chakra-ui-section.individual-sponsors')}
              </chakra.p>
              <Wrap justify='center'>
                {sponsors.individuals.map((i) => (
                  <WrapItem key={i.MemberId}>
                    <ChakraNextImage
                      src={i.image}
                      alt={i.name}
                      loading='lazy'
                      rounded='full'
                      width={40}
                      height={40}
                      objectFit='cover'
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>

        <ChakraProAd />

        <Box
          bgImage='url(/audio-bar.svg)'
          bgPos='bottom center'
          bgSize='120px'
          bgRepeat='repeat no-repeat'
        >
          <Container
            pt='7.5rem'
            pb='10rem'
            maxW='50rem'
            mx='auto'
            textAlign='center'
          >
            <Flex direction='column' align='center' maxW='600px' mx='auto'>
              <Circle size='80px' bg='blackAlpha.200' color='teal.400'>
                <FaMicrophone size='40px' />
              </Circle>
              <chakra.h2 textStyle='heading' mt='6' mb='6'>
                {t('homepage.event-section.title')}
              </chakra.h2>
              <Text mb='40px' fontSize='lg' opacity={0.7}>
                {t('homepage.event-section.description')}
              </Text>
            </Flex>
            <Button
              h='4rem'
              px='40px'
              fontSize='1.2rem'
              as='a'
              href='mailto:sage@adebayosegun.com?subject=Invitation to Speak!'
              size='lg'
              colorScheme='teal'
              rightIcon={<FaArrowRight fontSize='0.8em' />}
            >
              {t('homepage.event-section.invite-us-to-speak')}
            </Button>
          </Container>
        </Box>

        <DiscordStrip />

        <Footer />
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const { prettyCount } = await getGithubStars()
  const contributors = getAllContributors()
  const members = getAllMembers()
  const sponsors = getAllSponsors()

  return {
    props: {
      githubStars: prettyCount,
      members,
      contributors,
      sponsors,
    },
  }
}

export default HomePage
