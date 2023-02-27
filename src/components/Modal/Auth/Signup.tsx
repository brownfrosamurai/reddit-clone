import { authModalState } from '@/src/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { auth, firestore } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';

const Signup: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [error, setError] = useState('');
    const [signupForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    // Create firebase user with email and password
    const [createUserWithEmailAndPassword, userCred, loading, userError] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError(''); // Reset error after form submittion
        if (signupForm.password !== signupForm.confirmPassword) {
            // setError
            setError('Passwords do not match');
            return;
        }
        if (signupForm.password.length < 6) {
            // setError
            setError('Passwords must be at least 6 digits long');
            return;
        }

        if (signupForm.password.length! > 6) {
            // setError
            setError('Password must be at least 6 characters long');
        }
        createUserWithEmailAndPassword(signupForm.email, signupForm.password);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // update form state
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const createUserDocument = async (user: User) => {
        await addDoc(collection(firestore, 'users'), JSON.parse(JSON.stringify(user)));
    };

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred]);

    return (
        <form onSubmit={onSubmit}>
            <Input
                name="email"
                required
                placeholder="email"
                type="email"
                mb={2}
                onChange={handleChange}
                fontSize="10pt"
                _placeholder={{ color: 'grey.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg="grey.50"
            />

            <Input
                name="password"
                required
                placeholder="password"
                type="password"
                mb={2}
                onChange={handleChange}
                fontSize="10pt"
                _placeholder={{ color: 'grey.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg="grey.50"
            />

            <Input
                name="confirmPassword"
                required
                placeholder="confirm password"
                type="password"
                mb={2}
                onChange={handleChange}
                fontSize="10pt"
                _placeholder={{ color: 'grey.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg="grey.50"
            />
            <Text textAlign="center" color="red" fontSize="10pt">
                {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>

            <Button type="submit" width="100%" height="36px" mt={2} mb={2} isLoading={loading}>
                Sign Up
            </Button>
            {/* Link to Log in */}
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}> Already Registered ?</Text>
                <Text color="blue.500" fontWeight={700} cursor="pointer" onClick={() => setAuthModalState((prev) => ({ ...prev, view: 'login' }))}>
                    LOG IN
                </Text>
            </Flex>
        </form>
    );
};
export default Signup;
