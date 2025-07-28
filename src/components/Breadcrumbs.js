import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import routeGenerator from '../utils/routeGenerator';

const BreadcrumbContainer = styled.nav`
  margin-bottom: 20px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const BreadcrumbList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:not(:last-child)::after {
    content: '›';
    margin-left: 8px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: bold;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CurrentPage = styled.span`
  color: white;
  font-weight: 600;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
`;

const HomeIcon = styled.span`
  font-size: 16px;
  margin-right: 4px;
`;

const Breadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const loadBreadcrumbs = async () => {
      try {
        const crumbs = await routeGenerator.getBreadcrumbs(location.pathname);
        setBreadcrumbs(crumbs);
      } catch (error) {
        console.error('Failed to load breadcrumbs:', error);
        setBreadcrumbs([]);
      }
    };

    loadBreadcrumbs();
  }, [location.pathname]);

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink to="/">
            <HomeIcon>🏠</HomeIcon>
            {t('navigation.home')}
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Dynamic breadcrumbs */}
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <BreadcrumbItem key={crumb.id || index}>
              {isLast ? (
                <CurrentPage>
                  {crumb.icon && <span style={{ marginRight: '4px' }}>{crumb.icon}</span>}
                  }
                  {t(crumb.labelKey)}
                </CurrentPage>
              ) : (
                <BreadcrumbLink to={crumb.route}>
                  {crumb.icon && <span style={{ marginRight: '4px' }}>{crumb.icon}</span>}
                  }
                  {t(crumb.labelKey)}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumbs;