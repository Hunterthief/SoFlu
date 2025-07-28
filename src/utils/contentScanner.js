/**
 * Content Scanner Utility
 * Dynamically discovers and loads content from the public/content directory
 */

class ContentScanner {
  constructor() {
    this.cache = new Map();
    this.supportedImageFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    this.supportedAudioFormats = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
  }

  /**
   * Scans a category folder for images and matching audio files
   * @param {string} category - The category name (e.g., 'animals', 'fruits')
   * @returns {Promise<Array>} Array of content items with image and audio paths
   */
  async scanCategory(category) {
    const cacheKey = `category_${category}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Try to load manifest file first
      const manifestResponse = await fetch(`/content/images/${category}/manifest.json`);
      
      if (manifestResponse.ok) {
        const manifest = await manifestResponse.json();
        const items = await this.processManifestItems(category, manifest.images || []);
        this.cache.set(cacheKey, items);
        return items;
      }
    } catch (error) {
      console.warn(`No manifest found for ${category}, falling back to auto-discovery`);
    }

    // Fallback to auto-discovery
    const items = await this.autoDiscoverContent(category);
    this.cache.set(cacheKey, items);
    return items;
  }

  /**
   * Process items from manifest file
   */
  async processManifestItems(category, imageFiles) {
    const items = [];
    
    for (const imageFile of imageFiles) {
      const baseName = this.getBaseName(imageFile);
      const imagePath = `/content/images/${category}/${imageFile}`;
      
      // Check for matching audio file
      const audioPath = await this.findMatchingAudio(category, baseName);
      
      items.push({
        id: baseName,
        name: baseName,
        category,
        imagePath,
        audioPath,
        displayName: this.formatDisplayName(baseName)
      });
    }
    
    return items;
  }

  /**
   * Auto-discover content when no manifest is available
   */
  async autoDiscoverContent(category) {
    // This would require a backend endpoint to list files
    // For now, return empty array and log warning
    console.warn(`Auto-discovery not implemented. Please create manifest.json for ${category}`);
    return [];
  }

  /**
   * Find matching audio file for an image
   */
  async findMatchingAudio(category, baseName) {
    for (const format of this.supportedAudioFormats) {
      const audioPath = `/content/audio/${category}/${baseName}${format}`;
      
      try {
        const response = await fetch(audioPath, { method: 'HEAD' });
        if (response.ok) {
          return audioPath;
        }
      } catch (error) {
        // Continue checking other formats
      }
    }
    
    return null; // No matching audio found
  }

  /**
   * Get base name without extension
   */
  getBaseName(filename) {
    return filename.replace(/\.[^/.]+$/, '');
  }

  /**
   * Format display name from filename
   */
  formatDisplayName(baseName) {
    return baseName
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Clear cache for a specific category or all categories
   */
  clearCache(category = null) {
    if (category) {
      this.cache.delete(`category_${category}`);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Preload content for better performance
   */
  async preloadCategory(category) {
    const items = await this.scanCategory(category);
    
    // Preload images
    items.forEach(item => {
      const img = new Image();
      img.src = item.imagePath;
    });
    
    return items;
  }

  /**
   * Get all available categories
   */
  async getAvailableCategories() {
    try {
      const response = await fetch('/content/categories.json');
      if (response.ok) {
        const data = await response.json();
        return data.categories || [];
      }
    } catch (error) {
      console.warn('Could not load categories list');
    }
    
    // Fallback to hardcoded list
    return [
      'animals', 'fruits', 'vegetables', 'colors', 'shapes', 
      'numbers', 'body-parts', 'clothing', 'transportation', 
      'careers', 'household-items', 'school-supplies', 'insects'
    ];
  }
}

export default new ContentScanner();