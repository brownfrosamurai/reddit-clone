import { authModalState } from '@/src/atoms/authModalAtom';
import { auth } from '@/src/firebase/clientApp';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth)

  const handleClose = () => {
    setModalState(prev => ({
      ...prev,
      open: false
    }))
  }

  // const toggleView = () => setModalState({
  //   ...modalState,
  //   view: view as keyof typeof modalState.view
  // });

  useEffect(() => {
    if (user) handleClose();
    console.log('USER: ', user?.email)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>
            {modalState.view === 'login' && 'Login'}
            {modalState.view === 'signup' && 'Signup'}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            pb={6}
          >
            <Flex
              direction='column'
              alignItems='center'
              justifyContent='center'
              width='70%'
            >
              {modalState.view === 'login' || modalState.view === 'signup' ?
                (<>
                  <OAuthButtons />
                  <Text color='gray.500' fontWeight={700}>OR</Text>
                  <AuthInputs />
                </>) :
                <ResetPassword />
              }
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AuthModal;