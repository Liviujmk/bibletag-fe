import '../../styles/base-layouts/layouts.css'

import { ReactNode } from 'react';

type ContainerLayoutProps = {
    children: ReactNode;
};

export const ContainerLayout = (
    { children }: ContainerLayoutProps
) => {
    return (
        <div className='main-container'>
            {children}
        </div>
    );
};

