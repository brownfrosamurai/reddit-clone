import { authModalState } from '@/src/atoms/authModalAtom';
import { Text, Button, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const onSubmit = () => { }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm(prev => ({
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
      <Button type='submit' width='100%' height='36px' mb={2}>
        Log In
      </Button>
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