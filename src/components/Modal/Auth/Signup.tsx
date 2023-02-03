import { authModalState } from '@/src/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';


const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState)



  const [signupForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <form>
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

      <Input
        name='confirmPassword'
        required
        placeholder='confirm password'
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
      <Button type='submit' width='100%' height='36px' mb={2}>
        Sign Up
      </Button>
      {/* Link to Log in */}
      <Flex fontSize='9pt' justifyContent='center'>
        <Text mr={1}> Already Registered ?</Text>
        <Text color='blue.500'
          fontWeight={700}
          cursor='pointer'
          onClick={() =>
            setAuthModalState(prev => (
              { ...prev, view: 'login' }
            ))}
        >LOG IN</Text>
      </Flex>
    </form>
  )
}
export default Signup;