import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';
import NavigationButton from '../components/NavigationButton';

const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
`;

const WelcomeSection = styled(motion.div)`
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: ${props => props.theme.gradients.surface};
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.medium};
`;

const WelcomeTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 16px;
`;

const WelcomeText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const HomePage = () => {
  const { t } = useTranslation();

  const mainSections = [
    {
      id: 'parent-guide',
      labelKey: 'navigation.parentGuide',
      route: '/parent-guide',
      icon: '👨‍👩‍👧‍👦',
      coverImage: '/content/images/covers/parent-guide.jpg'
    },
    {
      id: 'speech-therapy',
      labelKey: 'navigation.speechTherapy',
      route: '/speech-therapy',
      icon: '🗣️',
      coverImage: '/content/images/covers/speech-therapy.jpg'
    },
    {
      id: 'skills',
      labelKey: 'navigation.skills',
      route: '/skills',
      icon: '🌟',
      coverImage: '/content/images/covers/skills.jpg'
    },
    {
      id: 'stories',
      labelKey: 'navigation.stories',
      route: '/stories',
      icon: '📚',
      coverImage: '/content/images/covers/stories.jpg'
    },
    {
      id: 'games',
      labelKey: 'navigation.games',
      route: '/games',
      icon: '🎮',
      coverImage: '/content/images/covers/games.jpg'
    }
  ];

  return (
    <PageTemplate showBreadcrumbs={false}>
      <WelcomeSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <WelcomeTitle>{t('app.title')}</WelcomeTitle>
        <WelcomeText>{t('app.subtitle')}</WelcomeText>
      </WelcomeSection>

      <HomeGrid>
        {mainSections.map((section, index) => (
          <NavigationButton
            key={section.id}
            to={section.route}
            labelKey={section.labelKey}
            icon={section.icon}
            coverImage={section.coverImage}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          />
        ))}
      </HomeGrid>
    </PageTemplate>
  );
};

export default HomePage;