import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const LogoIcon = styled.span`
  font-size: 2rem;
  margin-right: 8px;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0 0 20px 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const MobileNavLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary}20;
    transform: translateX(8px);
  }
  
  &.active {
    background: ${props => props.theme.colors.primary}30;
    color: ${props => props.theme.colors.primary};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { path: '/skills', labelKey: 'navigation.skills', icon: '🌟' },
    { path: '/stories', labelKey: 'navigation.stories', icon: '📚' },
    { path: '/games', labelKey: 'navigation.games', icon: '🎮' },
    { path: '/parent-guide', labelKey: 'navigation.parentGuide', icon: '👨‍👩‍👧‍👦' }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/" onClick={closeMobileMenu}>
          <LogoIcon>🎓</LogoIcon>
          {t('app.title')}
        </Logo>

        <Navigation>
          {mainNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={isActiveRoute(item.path) ? 'active' : ''}
            >
              {item.icon} {t(item.labelKey)}
            </NavLink>
          ))}
        </Navigation>

        <HeaderActions>
          <LanguageSwitcher />
          <ThemeToggle />
          
          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </HeaderActions>
      </HeaderContent>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {mainNavItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                className={isActiveRoute(item.path) ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {item.icon} {t(item.labelKey)}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;