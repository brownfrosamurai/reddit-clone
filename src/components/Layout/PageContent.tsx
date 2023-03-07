import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
    children: any;
};

const PageContent: React.FC<PageContentProps> = ({ children }: any | undefined) => {
    return (
        <Flex justify="center" padding="16px 0px">
            <Flex justify="center" width="95%" maxWidth="860px">
                {/* RHS  */}
                <Flex
                    direction="column"
                    width={{ base: '100%', md: '65%' }}
                    mr={{ base: 0, md: 6 }}
                    maxWidth="860px"
                >
                    {children && children[0 as keyof typeof children]}
                </Flex>
                {/* LHS  */}
                <Flex direction="column" flexGrow={1} display={{ base: 'none', md: 'flex' }}>
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    );
};
export default PageContent;
