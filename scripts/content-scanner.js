#!/usr/bin/env node

/**
 * Content Scanner Script
 * Scans the public/content directory and generates manifest files
 */

const fs = require('fs').promises;
const path = require('path');

class ContentScanner {
  constructor() {
    this.contentDir = path.join(process.cwd(), 'public', 'content');
    this.supportedImageFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    this.supportedAudioFormats = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
  }

  async scanAllCategories() {
    try {
      console.log('🔍 Scanning content directories...');
      
      const imagesDir = path.join(this.contentDir, 'images');
      const audioDir = path.join(this.contentDir, 'audio');
      
      // Ensure directories exist
      await this.ensureDirectoryExists(imagesDir);
      await this.ensureDirectoryExists(audioDir);
      
      // Get all category directories
      const categories = await this.getCategories(imagesDir);
      
      console.log(`📁 Found ${categories.length} categories:`, categories.join(', '));
      
      // Process each category
      const results = {};
      for (const category of categories) {
        console.log(`\n📂 Processing category: ${category}`);
        results[category] = await this.processCategory(category);
      }
      
      // Generate categories list
      await this.generateCategoriesList(categories);
      
      console.log('\n✅ Content scanning completed!');
      console.log('📊 Summary:');
      
      Object.entries(results).forEach(([category, data]) => {
        console.log(`  ${category}: ${data.images.length} images, ${data.audioMatches} audio files`);
      });
      
    } catch (error) {
      console.error('❌ Error scanning content:', error);
      process.exit(1);
    }
  }

  async getCategories(imagesDir) {
    try {
      const entries = await fs.readdir(imagesDir, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)
        .filter(name => !name.startsWith('.'));
    } catch (error) {
      console.warn('⚠️  Images directory not found, creating it...');
      await fs.mkdir(imagesDir, { recursive: true });
      return [];
    }
  }

  async processCategory(category) {
    const categoryImagesDir = path.join(this.contentDir, 'images', category);
    const categoryAudioDir = path.join(this.contentDir, 'audio', category);
    
    // Scan images
    const images = await this.scanImages(categoryImagesDir);
    
    // Check for matching audio files
    let audioMatches = 0;
    const itemsWithAudio = [];
    
    for (const image of images) {
      const baseName = this.getBaseName(image);
      const audioFile = await this.findMatchingAudio(categoryAudioDir, baseName);
      
      if (audioFile) {
        audioMatches++;
        itemsWithAudio.push({
          image,
          audio: audioFile,
          baseName
        });
      }
    }
    
    // Generate manifest
    const manifest = {
      category,
      lastUpdated: new Date().toISOString(),
      images,
      audioMatches,
      items: itemsWithAudio
    };
    
    // Write manifest file
    const manifestPath = path.join(categoryImagesDir, 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log(`  ✅ Generated manifest: ${images.length} images, ${audioMatches} with audio`);
    
    return manifest;
  }

  async scanImages(directory) {
    try {
      const files = await fs.readdir(directory);
      return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return this.supportedImageFormats.includes(ext) && file !== 'cover.jpg';
      }).sort();
    } catch (error) {
      console.warn(`⚠️  Could not scan images in ${directory}`);
      return [];
    }
  }

  async findMatchingAudio(audioDir, baseName) {
    for (const format of this.supportedAudioFormats) {
      const audioFile = `${baseName}${format}`;
      const audioPath = path.join(audioDir, audioFile);
      
      try {
        await fs.access(audioPath);
        return audioFile;
      } catch (error) {
        // File doesn't exist, continue
      }
    }
    
    return null;
  }

  async generateCategoriesList(categories) {
    const categoriesData = {
      lastUpdated: new Date().toISOString(),
      categories: categories.sort()
    };
    
    const categoriesPath = path.join(this.contentDir, 'categories.json');
    await fs.writeFile(categoriesPath, JSON.stringify(categoriesData, null, 2));
    
    console.log(`📝 Generated categories list: ${categories.length} categories`);
  }

  async ensureDirectoryExists(dir) {
    try {
      await fs.access(dir);
    } catch (error) {
      await fs.mkdir(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  }

  getBaseName(filename) {
    return path.parse(filename).name;
  }
}

// Run the scanner
if (require.main === module) {
  const scanner = new ContentScanner();
  scanner.scanAllCategories();
}

module.exports = ContentScanner;