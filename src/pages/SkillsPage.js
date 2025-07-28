import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';
import NavigationButton from '../components/NavigationButton';
import routeGenerator from '../utils/routeGenerator';

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const SkillsPage = () => {
  const { t } = useTranslation();
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkillCategories();
  }, []);

  const loadSkillCategories = async () => {
    try {
      const navigation = await routeGenerator.getNavigationStructure();
      const skillsSection = navigation.find(item => item.id === 'skills');
      
      if (skillsSection && skillsSection.children) {
        setSkillCategories(skillsSection.children);
      }
    } catch (error) {
      console.error('Failed to load skill categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTemplate
      titleKey="navigation.skills"
      subtitleKey="skills.subtitle"
      loading={loading}
    >
      <SkillsGrid>
        {skillCategories.map((category, index) => (
          <NavigationButton
            key={category.id}
            to={category.route}
            labelKey={category.labelKey}
            icon={category.icon}
            coverImage={category.coverImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          />
        ))}
      </SkillsGrid>
    </PageTemplate>
  );
};

export default SkillsPage;