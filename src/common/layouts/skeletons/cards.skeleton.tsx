import { Grid, Skeleton, Container, Space } from '@mantine/core';
import { PageTitleComponent } from '../../components/page-title';
const child = <Skeleton height={150} radius="md"/>;

interface Props {
  pageTitle: string;
}

export function CardsSkeleton(
  { pageTitle }: Props
) {
  return (
    <Container size="xl">
      <PageTitleComponent pageTitle={pageTitle} />
      <Space h="xl" />
      <Space h="xl" />
      <Grid>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}