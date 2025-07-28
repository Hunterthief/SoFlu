import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.gradients.primary};
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  color: white;
  margin: 0 0 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ContentContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 16px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.colors.error};
  background: ${props => props.theme.colors.error}10;
  border-radius: 12px;
  border: 2px solid ${props => props.theme.colors.error}30;
`;

const PageTemplate = ({
  titleKey,
  subtitleKey,
  children,
  loading = false,
  error = null,
  showBreadcrumbs = true,
  headerActions,
  className,
  contentClassName
}) => {
  const { t } = useTranslation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <PageContainer className={className}>
      <Header />
      
      <ContentArea>
        {showBreadcrumbs && <Breadcrumbs />}
        
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {(titleKey || subtitleKey) && (
            <PageHeader>
              {titleKey && (
                <PageTitle
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {t(titleKey)}
                </PageTitle>
              )}
              
              {subtitleKey && (
                <PageSubtitle>
                  {t(subtitleKey)}
                </PageSubtitle>
              )}
              
              {headerActions && (
                <div style={{ marginTop: '20px' }}>
                  {headerActions}
                </div>
              )}
            </PageHeader>
          )}

          <ContentContainer
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.2 }}
            className={contentClassName}
          >
            {loading && (
              <LoadingContainer>
                <div>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
                  {t('common.loading')}
                </div>
              </LoadingContainer>
            )}

            {error && (
              <ErrorContainer>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>❌</div>
                <h3>{t('common.error')}</h3>
                <p>{error}</p>
              </ErrorContainer>
            )}

            {!loading && !error && children}
          </ContentContainer>
        </motion.div>
      </ContentArea>
    </PageContainer>
  );
};

export default PageTemplate;