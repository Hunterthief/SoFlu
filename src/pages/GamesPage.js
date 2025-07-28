import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import PageTemplate from '../components/PageTemplate';
import NavigationButton from '../components/NavigationButton';
import routeGenerator from '../utils/routeGenerator';

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ComingSoonBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.theme.colors.warning};
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  z-index: 10;
`;

const GameCard = styled.div`
  position: relative;
`;

const GamesPage = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const navigation = await routeGenerator.getNavigationStructure();
      const gamesSection = navigation.find(item => item.id === 'games');
      
      if (gamesSection && gamesSection.children) {
        setGames(gamesSection.children);
      }
    } catch (error) {
      console.error('Failed to load games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGameClick = (game) => {
    // For now, show coming soon message
    alert(t('common.comingSoon') || 'Coming Soon!');
  };

  return (
    <PageTemplate
      titleKey="navigation.games"
      loading={loading}
    >
      <GamesGrid>
        {games.map((game, index) => (
          <GameCard key={game.id}>
            <ComingSoonBadge>
              {t('common.comingSoon') || 'Coming Soon'}
            </ComingSoonBadge>
            <NavigationButton
              labelKey={game.labelKey}
              icon={game.icon}
              coverImage={game.coverImage}
              onClick={() => handleGameClick(game)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            />
          </GameCard>
        ))}
      </GamesGrid>
    </PageTemplate>
  );
};

export default GamesPage;