import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';
import NavigationButton from '../components/NavigationButton';
import routeGenerator from '../utils/routeGenerator';

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 20px;
`;

const StoriesPage = () => {
  const { t } = useTranslation();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      const navigation = await routeGenerator.getNavigationStructure();
      const storiesSection = navigation.find(item => item.id === 'stories');
      
      if (storiesSection && storiesSection.children) {
        setStories(storiesSection.children);
      }
    } catch (error) {
      console.error('Failed to load stories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTemplate
      titleKey="navigation.stories"
      loading={loading}
    >
      <StoriesGrid>
        {stories.map((story, index) => (
          <NavigationButton
            key={story.id}
            to={story.route}
            labelKey={story.labelKey}
            icon={story.icon}
            coverImage={story.coverImage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          />
        ))}
      </StoriesGrid>
    </PageTemplate>
  );
};

export default StoriesPage;