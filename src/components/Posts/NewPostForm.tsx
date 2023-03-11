import { Post } from '@/src/atoms/postAtom';
import { firestore, storage } from '@/src/firebase/clientApp';
import { Alert, AlertIcon, Flex, Icon, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiPoll } from 'react-icons/bi';
import { BsLink45Deg, BsMic } from 'react-icons/bs';
import { IoDocumentText, IoImageOutline } from 'react-icons/io5';
import ImageUpload from './ImageUpload';
import FormTabItem from './TabItem';
import TextInputs from './TextInputs';

type NewPostFormProps = {
    user: User;
};

const formTabs: TabItem[] = [
    {
        title: 'Post',
        icon: IoDocumentText
    },
    {
        title: 'Images & Videos',
        icon: IoImageOutline
    },
    {
        title: 'Link',
        icon: BsLink45Deg
    },
    {
        title: 'Poll',
        icon: BiPoll
    },
    {
        title: 'Talk',
        icon: BsMic
    }
];

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [selectedFile, setSelectedFile] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [textInputs, setTextInputs] = useState({
        title: '',
        body: ''
    });

    const handleCreatePost = async () => {
        const { communityId } = router.query;
        // construct post object => type post
        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp
        };

        setLoading(true);
        try {
            // store post in DB
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
            // check for selected file instance
            if (selectedFile) {
                // store in storage => get download URL
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                await uploadString(imageRef, selectedFile, 'data_url');

                const downloadURL = await getDownloadURL(imageRef);

                // update post doc with image URL
                await updateDoc(postDocRef, {
                    imageURL: downloadURL
                });
            }
        } catch (error: any) {
            console.log('handleCreatePost error: ', error.message);
            setError(true);
        }
        setLoading(false);

        // redirect user back to the community page using the router
        // router.back()
    };

    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();

        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        };
    };

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {
            target: { name, value }
        } = event;

        setTextInputs((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item) => (
                    <FormTabItem
                        key={item.title}
                        item={item}
                        selected={item.title === selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === 'Post' && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={loading}
                    />
                )}
                {selectedTab === 'Images & Videos' && (
                    <ImageUpload
                        selectedFile={selectedFile}
                        onSelectImage={onSelectImage}
                        setSelectedFile={setSelectedFile}
                        setSelectedTab={setSelectedTab}
                    />
                )}
            </Flex>
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    <Text fontSize='9pt'>Error creating post!</Text>
                </Alert>
            )}
        </Flex>
    );
};
export default NewPostForm;
