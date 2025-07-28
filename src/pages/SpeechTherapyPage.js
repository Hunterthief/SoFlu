import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';

const SpeechTherapyPage = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate
      titleKey="navigation.speechTherapy"
      showBreadcrumbs={true}
    >
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>{t('common.comingSoon') || 'Coming Soon!'}</h2>
        <p>Speech therapy content will be available soon.</p>
      </div>
    </PageTemplate>
  );
};

export default SpeechTherapyPage;