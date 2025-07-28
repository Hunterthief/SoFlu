import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AudioPlayer from './AudioPlayer';
import LoadingSpinner from './LoadingSpinner';
import contentScanner from '../utils/contentScanner';

const GalleryContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ImageCard = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 16px;
`;

const ImageTitle = styled.h3`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const AudioSection = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: 20px;
  padding: 30px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: 12px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: white;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.colors.error};
  font-size: 18px;
`;

const ImageGallery = ({ category, title }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    loadContent();
  }, [category]);

  const loadContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const contentItems = await contentScanner.scanCategory(category);
      setItems(contentItems);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (selectedItem) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedItem]);

  if (loading) {
    return (
      <GalleryContainer>
        <LoadingSpinner message={t('common.loading')} />
      </GalleryContainer>
    );
  }

  if (error) {
    return (
      <GalleryContainer>
        <ErrorMessage>
          {t('common.error')}: {error}
        </ErrorMessage>
      </GalleryContainer>
    );
  }

  if (items.length === 0) {
    return (
      <GalleryContainer>
        <ErrorMessage>
          No content found for category: {category}
        </ErrorMessage>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      {title && <h1>{title}</h1>}
      
      <GalleryGrid>
        {items.map((item, index) => (
          <ImageCard
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleImageClick(item)}
          >
            <ImageContainer>
              <Image 
                src={item.imagePath} 
                alt={item.displayName}
                loading="lazy"
              />
              <ImageOverlay>
                <ImageTitle>{item.displayName}</ImageTitle>
              </ImageOverlay>
            </ImageContainer>
            
            {item.audioPath && (
              <AudioSection>
                <AudioPlayer 
                  audioPath={item.audioPath}
                  label={item.displayName}
                  showLabel={false}
                />
              </AudioSection>
            )}
          </ImageCard>
        ))}
      </GalleryGrid>

      <AnimatePresence>
        {selectedItem && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>×</CloseButton>
              
              <ModalImage 
                src={selectedItem.imagePath} 
                alt={selectedItem.displayName}
              />
              
              <h2>{selectedItem.displayName}</h2>
              
              {selectedItem.audioPath && (
                <AudioPlayer 
                  audioPath={selectedItem.audioPath}
                  label={selectedItem.displayName}
                  autoPlay={true}
                />
              )}
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default ImageGallery;