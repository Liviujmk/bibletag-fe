import { useState } from 'react';
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
    rem,
    Button,
    Text,
    Anchor,
    
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { IconPlus } from '@tabler/icons-react';
import { WithPermissions } from '../../../features/auth/components/with-permission';
import { useAppSelector } from '../../store/store-hook';
import { notifications } from '@mantine/notifications';
import { useDeleteArticleMutation } from '../../../features/articles/api/articles.api';

const HEADER_HEIGHT = rem(75);

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkLabel: {
        marginRight: rem(5),
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface DefaultHeaderProps {
    links: { to: string; label: string }[];
}

export function DefaultHeader({ links }: DefaultHeaderProps) {
    const { activeTab } = useAppSelector((state) => state.app);
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(activeTab);
    const { classes, cx } = useStyles();
    const navigate = useNavigate();
    
    const [deleteArticle, { isSuccess }] = useDeleteArticleMutation();
    
    const deleteHandler = (id: string) => {
        deleteArticle(id!);
        notifications.show({
            title: 'Success',
            message: `Deleted successfully`,
        });
        navigate('/articles');
    }

    const linkItems = links.map((link) => (
        <Link
            key={link.label}
            to={link.to}
            className={cx(classes.link, { [classes.linkActive]: active === link.to })}
            onClick={() => {
                setActive(link.to);
                close();
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={HEADER_HEIGHT} className={classes.root}>
            <Container className={classes.header} fluid>
                <Anchor fw={900} size={35}  color='black' ff={'Londrina Solid'} lts={2} href='/'>BibleTag</Anchor>
                <Group spacing={5} className={classes.links}>
                    {linkItems}
                </Group>
                
                <WithPermissions>
                    <Button.Group>
                    <Button
                        variant='default'
                        leftIcon={<IconPlus size="1rem"/>}
                        onClick={() => {
                            navigate('/articles/create');
                        }}
                        children='Create Article'
                    />
                    {
                        window.location.pathname.split('/')[2] ? (
                            <>
                                <Button 
                                    variant="default"
                                    onClick={() => navigate(`/articles/${window.location.pathname.split('/')[2]}/edit`)}
                                >Edit</Button>
                                <Button
                                    color='red'
                                    onClick={() => deleteHandler(window.location.pathname.split('/')[2])}
                                >Delete</Button>
                            </>
                        ) : <></>
                    }  
                    </Button.Group>
                </WithPermissions>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {linkItems}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}