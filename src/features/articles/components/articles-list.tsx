import useSWR  from 'swr';
import { Article } from '../interfaces/article.interface';
import { useGetArticlesQuery } from '../api/articles.api';
import { CardsLayout } from '../../../common/layouts/page/card.layout';
import { Link } from 'react-router-dom';
import { Badge, Card, Group, Title, Grid, Text } from '@mantine/core';
import { CardsSkeleton } from '../../../common/layouts/skeletons/cards.skeleton';
import { useAppDispatch } from '../../../common/store/store-hook';
import { setActiveTab } from '../../../common/store/app-slice';
import { PageTitleComponent } from '../../../common/components/page-title';
import { FailedPage } from '../../../common/components/failed';
import { ArticleBadges } from './article-badges';

interface Props {
    pageTitle: string;
}

export const ArticleList = ({ pageTitle }: Props) => {
    const { data: articles, isLoading, isError } = useGetArticlesQuery();

    if (isError) return <FailedPage />;
    if (isLoading) return <CardsSkeleton pageTitle={pageTitle} />;
    
    return (
        <>
            <PageTitleComponent pageTitle={pageTitle} />
            <CardsLayout>
                {articles?.map((article: Article) => {                    
                    return (
                        <Grid.Col span={article.title.length > 25 ? 5: 3} key={article._id}>
                            <Card padding="lg" radius="md" withBorder style={{height: '100%'}}>
                                <ArticleBadges data={article.collectionName} />
                                <Title order={3} mb="xs">
                                    <Link to = {article._id ? `${article._id}` : ''} className='inherit'>{article.title.split('-').join(" ")}</Link>
                                </Title>
                            </Card>
                        </Grid.Col>
                    );
                })}
            </CardsLayout>
        </>
    );
};