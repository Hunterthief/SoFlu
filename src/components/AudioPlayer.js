import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import audioManager from '../utils/audioManager';

const AudioPlayerContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.theme.colors.primary}20;
  border-radius: 20px;
  border: 2px solid ${props => props.theme.colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary}30;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &.playing {
    background: ${props => props.theme.colors.success}20;
    border-color: ${props => props.theme.colors.success};
  }
  
  &.error {
    background: ${props => props.theme.colors.error}20;
    border-color: ${props => props.theme.colors.error};
    cursor: not-allowed;
  }
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StatusText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  min-width: 60px;
`;

const AudioPlayer = ({ 
  audioPath, 
  label, 
  autoPlay = false, 
  showLabel = true,
  size = 'medium',
  onPlay,
  onError,
  className 
}) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (autoPlay && audioPath) {
      handlePlay();
    }
  }, [audioPath, autoPlay]);

  useEffect(() => {
    // Listen for audio manager status changes
    const checkStatus = () => {
      const status = audioManager.getStatus();
      setIsPlaying(status.isPlaying && status.currentAudio === audioPath);
    };

    const interval = setInterval(checkStatus, 100);
    return () => clearInterval(interval);
  }, [audioPath]);

  const handlePlay = async () => {
    if (!audioPath) {
      setHasError(true);
      onError?.(new Error('No audio path provided'));
      return;
    }

    if (isPlaying) {
      audioManager.stopCurrent();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const success = await audioManager.playAudio(audioPath);
      
      if (success) {
        setIsPlaying(true);
        onPlay?.(audioPath);
      } else {
        setHasError(true);
        onError?.(new Error('Failed to play audio'));
      }
    } catch (error) {
      setHasError(true);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getIcon = () => {
    if (isLoading) return '⏳';
    if (hasError) return '❌';
    if (isPlaying) return '⏸️';
    return '▶️';
  };

  const getStatusText = () => {
    if (isLoading) return t('audio.loading');
    if (hasError) return t('audio.error');
    if (isPlaying) return t('audio.playing');
    return label || t('common.playAudio');
  };

  const containerClass = `
    ${isPlaying ? 'playing' : ''}
    ${hasError ? 'error' : ''}
    ${className || ''}
  `.trim();

  return (
    <AudioPlayerContainer 
      className={containerClass}
      onClick={handlePlay}
      title={getStatusText()}
    >
      <PlayButton disabled={isLoading || hasError}>
        {getIcon()}
      </PlayButton>
      
      {showLabel && (
        <StatusText>
          {getStatusText()}
        </StatusText>
      )}
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;