import { authModalState } from '@/src/atoms/authModalAtom';
import { auth } from '@/src/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/src/firebase/errors';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  // Firebase login logic 
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signInWithEmailAndPassword(loginForm.email, loginForm.password)
  }
  // Form handle change function 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // update form state 
    setLoginForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        name='email'
        required
        placeholder='email'
        type='email'
        mb={2} onChange={handleChange}
        fontSize='10pt'
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
        bg='grey.50'
      />

      <Input
        name='password'
        required
        placeholder='password'
        type='password'
        mb={2} onChange={handleChange}
        fontSize='10pt'
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
        bg='grey.50'
      />
      <Text
        textAlign='center'
        color='red'
        fontSize='10pt'
      >
        {error?.message || FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button type='submit' width='100%' height='36px' mb={2} mt={2} isLoading={loading}>
        Log In
      </Button>
      <Flex justifyContent='center' mb={2}>
        <Text fontSize='9pt' mr={1}>Forgot your password?</Text>
        <Text fontSize='9pt'
          color='blue.500'
          cursor='pointer'
          fontWeight={700}
          onClick={() => {
            setAuthModalState(prev => ({ ...prev, view: 'resetPassword' }))
          }}
        >
          Reset
        </Text>
      </Flex>
      {/* Link to sign up  */}
      <Flex fontSize='9pt' justifyContent='center'>
        <Text mr={1}> New here ?</Text>
        <Text color='blue.500'
          fontWeight={700}
          cursor='pointer'
          onClick={() =>
            setAuthModalState(prev => (
              { ...prev, view: 'signup' }
            ))}
        >SIGN UP</Text>
      </Flex>
    </form>
  )
}
export default Login;