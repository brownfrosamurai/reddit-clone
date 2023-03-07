import { Button, Flex } from '@chakra-ui/react';
import React, { useRef } from 'react';

type ImageUploadProps = {
    selectedFile?: string;
    onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedFile: (value: string) => void;
    setSelectedTab: (event: string) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
    selectedFile,
    setSelectedFile,
    onSelectImage
}) => {
    const selectedFileRef = useRef<HTMLInputElement>(null);
    return (
        <Flex align="center" justify="center" width="100%">
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
                <input ref={selectedFileRef} type="file" onChange={onSelectImage} hidden />
            </Flex>
        </Flex>
    );
};
export default ImageUpload;
