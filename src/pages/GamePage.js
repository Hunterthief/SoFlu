import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';

const GamePage = () => {
  const { t } = useTranslation();
  const { gameId } = useParams();

  return (
    <PageTemplate
      titleKey={`games.${gameId}`}
      showBreadcrumbs={true}
    >
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>{t('common.comingSoon') || 'Coming Soon!'}</h2>
        <p>Game: {gameId}</p>
        <p>This game will be implemented in a future update.</p>
      </div>
    </PageTemplate>
  );
};

export default GamePage;