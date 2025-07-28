import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';

const NotFoundContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const ErrorIcon = styled(motion.div)`
  font-size: 6rem;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 30px;
  line-height: 1.6;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background: ${props => props.theme.gradients.primary};
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
`;

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate showBreadcrumbs={false}>
      <NotFoundContainer>
        <ErrorIcon
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          🤔
        </ErrorIcon>
        
        <ErrorTitle>404</ErrorTitle>
        
        <ErrorMessage>
          Oops! The page you're looking for doesn't exist.
          <br />
          Let's get you back to learning!
        </ErrorMessage>
        
        <HomeButton to="/">
          🏠 {t('navigation.home')}
        </HomeButton>
      </NotFoundContainer>
    </PageTemplate>
  );
};

export default NotFoundPage;