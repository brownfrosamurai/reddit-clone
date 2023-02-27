import { auth, firestore } from '@/src/firebase/clientApp';
import { Box, Button, Checkbox, Divider, Flex, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';

type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
    const user = useAuthState(auth)[0];
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState('public');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // update communityName and chars Remaining
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;

        setCommunityName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);
    };

    // update community type checkboxes
    const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(event.target.name);
    };

    // persist data to database
    const handleCreateCommunity = async () => {
        if (error) setError('');
        // validate community name
        const format = new RegExp('^[a-zA-Z0-9_.-]*$');

        if (!format.test(communityName) || communityName.length < 3) {
            throw new Error('Community names must be between 3-21 characters, and can only contain letters, numbers or underscores');
        }

        setLoading(true);

        try {
            const communityDocRef = doc(firestore, 'communities', communityName);

            await runTransaction(firestore, async (transaction) => {
                const communityDoc = await transaction.get(communityDocRef);
                if (communityDoc.exists()) {
                    throw new Error(`Sorry, r/${communityName} is taken, Try another.`);
                }

                transaction.set(communityDocRef, {
                    creatordId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType
                });

                // create communitySnippets on users
                transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName,
                    isModerator: true
                });
            });
        } catch (error: any) {
            console.log('handleCreateCommunity', error);
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display="flex" flexDirection="column" fontSize={15} padding={3}>
                        Create a Community
                    </ModalHeader>
                    <Box pl={3} pr={3}>
                        <Divider />
                        <ModalCloseButton />

                        {/* Input fields  */}
                        <ModalBody display="flex" flexDirection="column" padding="10px 0px">
                            <Text fontWeight={600} fontSize={15}>
                                Name
                            </Text>
                            <Text fontSize={11} color="gray.500">
                                Community names including capitalization cannot be changed
                            </Text>
                            <Text position="relative" top="28px" left="10px" width="20px" color="gray.400">
                                r/
                            </Text>
                            <Input position="relative" value={communityName} size="sm" pl="22px" onChange={handleChange} />
                            <Text color={charsRemaining === 0 ? 'red' : 'gray.500'} fontSize="9pt">
                                {charsRemaining} characters remaining.
                            </Text>
                            <Text fontSize="9pt" color="red" pt={1}>
                                {error}
                            </Text>
                            {/* Checkbox input  */}
                            <Box mt={4} mb={4}>
                                <Text fontWeight={600} fontSize={15}>
                                    Community Type
                                </Text>
                                <Stack>
                                    <Checkbox name="public" isChecked={communityType === 'public'} onChange={onCommunityTypeChange}>
                                        <Flex align="center">
                                            <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Public
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500">
                                                Anyone can view, post, and comment to this community
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox name="restricted" isChecked={communityType === 'restricted'} onChange={onCommunityTypeChange}>
                                        <Flex align="center">
                                            <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Restricted
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500">
                                                Anyone can view this community, but only approved users can post
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                    <Checkbox name="private" isChecked={communityType === 'private'} onChange={onCommunityTypeChange}>
                                        <Flex align="center">
                                            <Icon as={HiLockClosed} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Private
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500">
                                                Only approved users can view and submit to this community
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>
                    {/* Control buttons  */}
                    <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
                        <Button variant="outline" mr={3} height="30px" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button height="30px" onClick={handleCreateCommunity}>
                            Create Community
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
export default CreateCommunityModal;
