import { Grid } from '@mantine/core';
import '../../styles/base-layouts/layouts.css'

import { ReactNode } from 'react';

type CardLayoutProps = {
    children: ReactNode;
};

export const CardsLayout = (
    { children }: CardLayoutProps
) => {
    return (
        <Grid grow gutter="xl">
            {children}
        </Grid>
    );
};

