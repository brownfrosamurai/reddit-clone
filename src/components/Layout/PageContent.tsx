import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {};

const PageContent: React.FC<PageContentProps> = ({ children }: any | undefined) => {
    return (
        <Flex border="1px solid red" justify="center" padding="16px 0px">
            <Flex border="1px solid green" justify="center" width="95%" maxWidth="860px">
                {/* RHS  */}
                <Flex
                    border="1px solid blue"
                    direction="column"
                    width={{ base: '100%', md: '65%' }}
                    mr={{ base: 0, md: 6 }}
                    maxWidth="860px"
                >
                    {children && children[0 as keyof typeof children]}
                </Flex>
                {/* LHS  */}
                <Flex
                    border="1px solid orange"
                    direction="column"
                    flexGrow={1}
                    display={{ base: 'none', md: 'flex' }}
                >
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    );
};
export default PageContent;
