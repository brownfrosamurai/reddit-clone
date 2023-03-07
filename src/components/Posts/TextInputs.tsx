import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';

type TextInputsProps = {
    textInputs: {
        title: string;
        body: string;
    };
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
    textInputs,
    onChange,
    handleCreatePost,
    loading
}) => {
    return (
        <Stack spacing={3} width="100%">
            <Input
                name="title"
                value={textInputs.title}
                placeholder="Title"
                fontSize="10pt"
                borderRadius={4}
                _placeholder={{ color: 'gray.500' }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                onChange={onChange}
            />
            <Textarea
                name="body"
                value={textInputs.body}
                placeholder="Text (optional)"
                fontSize="10pt"
                borderRadius={4}
                height="100px"
                _placeholder={{ color: 'gray.500' }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                onChange={onChange}
            />
            <Flex justify="flex-end">
                <Button
                    height="34px"
                    padding="0px 30px"
                    isLoading={loading}
                    disabled={!textInputs.title}
                    onClick={handleCreatePost}
                >
                    Post
                </Button>
            </Flex>
        </Stack>
    );
};
export default TextInputs;
