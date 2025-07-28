/**
 * Audio Manager Utility
 * Handles audio playback with proper cleanup and error handling
 */

class AudioManager {
  constructor() {
    this.currentAudio = null;
    this.audioCache = new Map();
    this.isPlaying = false;
    this.volume = 1.0;
  }

  /**
   * Play audio file with proper error handling
   * @param {string} audioPath - Path to the audio file
   * @param {Object} options - Playback options
   * @returns {Promise<boolean>} Success status
   */
  async playAudio(audioPath, options = {}) {
    if (!audioPath) {
      console.warn('No audio path provided');
      return false;
    }

    try {
      // Stop current audio if playing
      this.stopCurrent();

      // Get or create audio element
      let audio = this.audioCache.get(audioPath);
      
      if (!audio) {
        audio = new Audio(audioPath);
        audio.volume = this.volume;
        
        // Add to cache
        this.audioCache.set(audioPath, audio);
        
        // Preload the audio
        audio.preload = 'auto';
      }

      // Set up event listeners
      return new Promise((resolve, reject) => {
        const onCanPlay = () => {
          audio.removeEventListener('canplay', onCanPlay);
          audio.removeEventListener('error', onError);
          
          this.currentAudio = audio;
          this.isPlaying = true;
          
          audio.play()
            .then(() => {
              resolve(true);
            })
            .catch(reject);
        };

        const onError = (error) => {
          audio.removeEventListener('canplay', onCanPlay);
          audio.removeEventListener('error', onError);
          console.error('Audio loading error:', error);
          reject(new Error(`Failed to load audio: ${audioPath}`));
        };

        const onEnded = () => {
          this.isPlaying = false;
          this.currentAudio = null;
          audio.removeEventListener('ended', onEnded);
        };

        audio.addEventListener('canplay', onCanPlay);
        audio.addEventListener('error', onError);
        audio.addEventListener('ended', onEnded);

        // If audio is already loaded, trigger canplay
        if (audio.readyState >= 3) {
          onCanPlay();
        }
      });

    } catch (error) {
      console.error('Audio playback error:', error);
      return false;
    }
  }

  /**
   * Stop currently playing audio
   */
  stopCurrent() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
    this.isPlaying = false;
    this.currentAudio = null;
  }

  /**
   * Pause current audio
   */
  pauseCurrent() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
      this.isPlaying = false;
    }
  }

  /**
   * Resume current audio
   */
  resumeCurrent() {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play();
      this.isPlaying = true;
    }
  }

  /**
   * Set volume for all audio
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
    
    // Update cached audio elements
    this.audioCache.forEach(audio => {
      audio.volume = this.volume;
    });
  }

  /**
   * Preload audio files for better performance
   * @param {Array<string>} audioPaths - Array of audio file paths
   */
  async preloadAudio(audioPaths) {
    const promises = audioPaths.map(async (path) => {
      if (!this.audioCache.has(path)) {
        try {
          const audio = new Audio(path);
          audio.preload = 'auto';
          audio.volume = this.volume;
          this.audioCache.set(path, audio);
          
          return new Promise((resolve) => {
            audio.addEventListener('canplaythrough', resolve, { once: true });
            audio.addEventListener('error', resolve, { once: true });
          });
        } catch (error) {
          console.warn(`Failed to preload audio: ${path}`);
        }
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Clear audio cache
   */
  clearCache() {
    this.stopCurrent();
    this.audioCache.clear();
  }

  /**
   * Get current playback status
   */
  getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentAudio: this.currentAudio?.src || null,
      volume: this.volume
    };
  }
}

export default new AudioManager();