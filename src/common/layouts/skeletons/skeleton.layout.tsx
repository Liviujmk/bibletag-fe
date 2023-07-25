import { Skeleton, Card, Center } from '@mantine/core';

export function ArticleSkeleton() {
  return (
    <div className='main-container new'>
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={10} radius="xl" />
      <Skeleton height={10} mt={12} radius="xl" />
      <Skeleton height={10} mt={12} width="70%" radius="xl" />
      <Skeleton height={10} mt={12} width="70%" radius="xl" />
      <Skeleton height={10} mt={12} radius="xl" />
      <Skeleton height={10} mt={36} radius="xl" />
      <Skeleton height={10} mt={12} width="70%" radius="xl" />
      <Skeleton height={10} mt={12} width="70%" radius="xl" />
      <Skeleton height={10} mt={36} radius="xl" />
      <Skeleton height={10} mt={12} radius="xl" />
      <Skeleton height={10} mt={12} width="70%" radius="xl" />
      <Skeleton height={10} mt={12} width="70%" radius="xl" />
    </div>
  );
}