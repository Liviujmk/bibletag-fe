import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { HeroTitle } from './hero-title/hero-title';
const image = {
  src: 'https://ui.mantine.dev/_next/static/media/image.9a65bd94.svg'
}

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 5)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.5,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

export function HomeComponent() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <HeroTitle>
              Search  <span className={classes.highlight}>Bible</span> topics <br /> in seconds 
            </HeroTitle>
            <Text color="dimmed" mt="md">
              Search for Bible topics in seconds. Find verses that relate to your topic. Also find various other articles and resources.
            </Text>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control} onClick={() => navigate('articles')}>
                Go to articles
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control} onClick={() => navigate('collections')}>
                Collections
              </Button>
            </Group>
          </div>
          <Image src={image.src} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}