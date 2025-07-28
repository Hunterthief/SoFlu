import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ButtonContainer = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
`;

const ButtonContent = styled.div`
  position: relative;
  background: ${props => props.coverImage 
    ? `linear-gradient(135deg, rgba(39, 165, 181, 0.9), rgba(161, 141, 208, 0.9)), url(${props.coverImage})`
    : `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`
  };
  background-size: cover;
  background-position: center;
  padding: 24px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      ${props => props.theme.colors.primary}20, 
      ${props => props.theme.colors.secondary}20
    );
    z-index: 1;
  }
  
  > * {
    position: relative;
    z-index: 2;
  }
`;

const IconContainer = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const ButtonText = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
`;

const SubText = styled.p`
  font-size: 14px;
  margin: 4px 0 0 0;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const NavigationButton = ({ 
  to, 
  labelKey, 
  icon, 
  coverImage, 
  subText,
  onClick,
  className,
  ...props 
}) => {
  const { t } = useTranslation();

  const buttonContent = (
    <ButtonContent coverImage={coverImage}>
      {icon && (
        <IconContainer>
          {icon}
        </IconContainer>
      )}
      
      <ButtonText>
        {t(labelKey)}
      </ButtonText>
      
      {subText && (
        <SubText>
          {t(subText)}
        </SubText>
      )}
    </ButtonContent>
  );

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <ButtonContainer
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      {to ? (
        <ButtonLink to={to} onClick={handleClick}>
          {buttonContent}
        </ButtonLink>
      ) : (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {buttonContent}
        </div>
      )}
    </ButtonContainer>
  );
};

export default NavigationButton;