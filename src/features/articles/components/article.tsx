/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStyles, Text, Title, TextInput, Button, Image, rem, TypographyStylesProvider, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetArticleQuery, useDeleteArticleMutation } from '../api/articles.api';

import { Article } from '../interfaces/article.interface';
import { ArticleSkeleton } from '../../../common/layouts/skeletons/skeleton.layout';
import { useEffect } from 'react';
import { WithPermissions } from '../../auth/components/with-permission';
import { PageTitleComponent } from '../../../common/components/page-title';

const image = {
    src: './../../../../public/image.svg'
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: '',
        padding: `calc(${theme.spacing.xl} * 2)`,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        // maxWidth: 1000,

        [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column-reverse',
            padding: theme.spacing.xl,
        },
    },

    image: {
        maxWidth: '40%',

        [theme.fn.smallerThan('sm')]: {
            maxWidth: '100%',
        },
    },

    body: {
        paddingRight: `calc(${theme.spacing.xl} * 4)`,
        paddingLeft: `calc(${theme.spacing.xl} * 4)`,

        [theme.fn.smallerThan('sm')]: {
            paddingRight: 0,
            paddingLeft: 0,
            marginTop: theme.spacing.xl,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
        marginBottom: theme.spacing.md,
    },

    controls: {
        display: 'flex',
        marginTop: theme.spacing.xl,
    },

    inputWrapper: {
        width: '100%',
        flex: '1',
    },

    input: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRight: 0,
    },

    control: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
}));

export function ShowArticle() {
    const { classes } = useStyles();
    const { id } = useParams<{ id: string | any }>();
    const navigate = useNavigate();

    const { data: article, isError: error } = useGetArticleQuery(id);
    const [deleteArticle, { isSuccess }] = useDeleteArticleMutation();
    
    const deleteHandler = () => {
        deleteArticle(article?._id!);
        notifications.show({
            title: 'Success',
            message: `${article?.title} deleted successfully`,
        });
        navigate('/articles');
    }
    
    if (error) return <div>Failed to load. Article does not exist</div>;
    if (!article) return <ArticleSkeleton />;

    return (
        <div>
            <div className={classes.body}>
                <PageTitleComponent pageTitle={article.title?.split('-').join(' ')} size={40}/>
                <TypographyStylesProvider styles={{ root: { lineHeight: 1.8 } }}>
                    <div dangerouslySetInnerHTML={
                        // @ts-ignore
                        { __html: article.markdown ? article.markdown : article.content }
                    } />
                </TypographyStylesProvider>
            </div>
            <WithPermissions> 
                <Button.Group>
                    <Button 
                        variant="default"
                        onClick={() => navigate(`/articles/${article._id}/edit`)}
                        >Edit</Button>
                    <Button
                        color='red'
                        onClick={deleteHandler}
                        >Delete</Button>
                </Button.Group>
            </WithPermissions>
        </div>
    );
}