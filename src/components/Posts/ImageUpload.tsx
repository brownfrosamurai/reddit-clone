import { Button, Flex, Image, Stack } from '@chakra-ui/react';
// import Image from 'next/image';
import React, { useRef } from 'react';

type ImageUploadProps = {
    selectedFile?: string;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedFile: (value: string) => void;
    setSelectedTab: (value: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
    selectedFile,
    setSelectedFile,
    setSelectedTab,
    onSelectImage
}) => {
    const selectedFileRef = useRef<HTMLInputElement>(null);

    return (
        <Flex align="center" justify="center" width="100%" direction="column">
            {selectedFile ? (
                <>
                    <Image
                        src={selectedFile}
                        alt="uploaded image"
                        maxWidth="400px"
                        maxHeight="400px"
                    />
                    <Stack direction="row" mt={4}>
                        <Button height="28px" onClick={() => setSelectedTab('Post')}>
                            Back to Post
                        </Button>
                        <Button height="28px" onClick={() => setSelectedFile('')}>
                            Remove
                        </Button>
                    </Stack>
                </>
            ) : (
                <Flex
                    justify="center"
                    align="center"
                    p={20}
                    border="1px solid"
                    borderColor="gray.200"
                    width="100%"
                    borderRadius={4}
                >
                    <Button
                        variant="outline"
                        height="28px"
                        onClick={() => selectedFileRef.current?.click()}
                    >
                        Upload
                    </Button>
                    <input ref={selectedFileRef} type="file" hidden onChange={onSelectImage} />
                </Flex>
            )}
        </Flex>
    );
};
export default ImageUpload;
