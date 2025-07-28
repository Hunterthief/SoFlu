import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';
import ImageGallery from '../components/ImageGallery';

const SkillCategoryPage = () => {
  const { t } = useTranslation();
  const { category } = useParams();

  // Extract category from URL path
  const categoryId = category || window.location.pathname.split('/').pop();
  
  // Convert URL-friendly category to internal format
  const normalizedCategory = categoryId.replace('-', '_');
  
  // Get the translation key for the category
  const getTitleKey = (cat) => {
    const categoryMap = {
      'animals': 'skills.animals',
      'fruits': 'skills.fruits',
      'vegetables': 'skills.vegetables',
      'colors': 'skills.colors',
      'shapes': 'skills.shapes',
      'numbers': 'skills.numbers',
      'body_parts': 'skills.bodyParts',
      'body-parts': 'skills.bodyParts',
      'clothing': 'skills.clothing',
      'transportation': 'skills.transportation',
      'careers': 'skills.careers',
      'household_items': 'skills.householdItems',
      'household-items': 'skills.householdItems',
      'school_supplies': 'skills.schoolSupplies',
      'school-supplies': 'skills.schoolSupplies',
      'insects': 'skills.insects'
    };
    
    return categoryMap[cat] || 'navigation.skills';
  };

  const titleKey = getTitleKey(categoryId);

  return (
    <PageTemplate
      titleKey={titleKey}
      showBreadcrumbs={true}
    >
      <ImageGallery 
        category={normalizedCategory}
        title={t(titleKey)}
      />
    </PageTemplate>
  );
};

export default SkillCategoryPage;