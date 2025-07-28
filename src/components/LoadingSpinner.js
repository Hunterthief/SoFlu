import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  gap: 16px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${props => props.theme.colors.primary}30;
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled(motion.p)`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  margin: 0;
  text-align: center;
`;

const LoadingSpinner = ({ message = 'Loading...', size = 40 }) => {
  return (
    <SpinnerContainer>
      <Spinner style={{ width: size, height: size }} />
      <LoadingText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;