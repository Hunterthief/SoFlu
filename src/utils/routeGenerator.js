/**
 * Route Generator Utility
 * Dynamically generates routes from navigation configuration
 */

import { lazy } from 'react';

// Lazy load page components
const HomePage = lazy(() => import('../pages/HomePage'));
const SkillsPage = lazy(() => import('../pages/SkillsPage'));
const SkillCategoryPage = lazy(() => import('../pages/SkillCategoryPage'));
const StoriesPage = lazy(() => import('../pages/StoriesPage'));
const StoryPage = lazy(() => import('../pages/StoryPage'));
const GamesPage = lazy(() => import('../pages/GamesPage'));
const GamePage = lazy(() => import('../pages/GamePage'));
const ParentGuidePage = lazy(() => import('../pages/ParentGuidePage'));
const SpeechTherapyPage = lazy(() => import('../pages/SpeechTherapyPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

class RouteGenerator {
  constructor() {
    this.navigationConfig = null;
    this.routes = [];
  }

  /**
   * Load navigation configuration
   */
  async loadNavigationConfig() {
    if (this.navigationConfig) {
      return this.navigationConfig;
    }

    try {
      const response = await fetch('/content/navigation.json');
      this.navigationConfig = await response.json();
      return this.navigationConfig;
    } catch (error) {
      console.error('Failed to load navigation config:', error);
      return { main: [] };
    }
  }

  /**
   * Generate routes from navigation configuration
   */
  async generateRoutes() {
    const config = await this.loadNavigationConfig();
    const routes = [];

    // Add home route
    routes.push({
      path: '/',
      element: HomePage,
      exact: true
    });

    // Process main navigation items
    this.processNavigationItems(config.main, routes);

    // Add catch-all route
    routes.push({
      path: '*',
      element: NotFoundPage
    });

    this.routes = routes;
    return routes;
  }

  /**
   * Process navigation items recursively
   */
  processNavigationItems(items, routes, parentPath = '') {
    items.forEach(item => {
      const fullPath = parentPath + item.route;
      
      // Add route for current item
      routes.push({
        path: fullPath,
        element: this.getComponentForRoute(item),
        id: item.id,
        labelKey: item.labelKey,
        icon: item.icon,
        coverImage: item.coverImage
      });

      // Process children if they exist
      if (item.children && item.children.length > 0) {
        this.processNavigationItems(item.children, routes, parentPath);
      }
    });
  }

  /**
   * Map routes to appropriate components
   */
  getComponentForRoute(item) {
    const { route, id } = item;

    // Skills routes
    if (route.startsWith('/skills/') && route !== '/skills') {
      return SkillCategoryPage;
    }
    if (route === '/skills') {
      return SkillsPage;
    }

    // Stories routes
    if (route.startsWith('/stories/') && route !== '/stories') {
      return StoryPage;
    }
    if (route === '/stories') {
      return StoriesPage;
    }

    // Games routes
    if (route.startsWith('/games/') && route !== '/games') {
      return GamePage;
    }
    if (route === '/games') {
      return GamesPage;
    }

    // Parent guide routes
    if (route.startsWith('/parent-guide')) {
      return ParentGuidePage;
    }

    // Speech therapy routes
    if (route.startsWith('/speech-therapy')) {
      return SpeechTherapyPage;
    }

    // Default to home page
    return HomePage;
  }

  /**
   * Get navigation structure for menu generation
   */
  async getNavigationStructure() {
    const config = await this.loadNavigationConfig();
    return config.main || [];
  }

  /**
   * Find route by ID
   */
  async findRouteById(id) {
    const config = await this.loadNavigationConfig();
    return this.searchRouteById(config.main, id);
  }

  /**
   * Search for route by ID recursively
   */
  searchRouteById(items, targetId) {
    for (const item of items) {
      if (item.id === targetId) {
        return item;
      }
      
      if (item.children) {
        const found = this.searchRouteById(item.children, targetId);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * Get breadcrumb trail for a route
   */
  async getBreadcrumbs(currentPath) {
    const config = await this.loadNavigationConfig();
    const breadcrumbs = [];
    
    this.buildBreadcrumbs(config.main, currentPath, breadcrumbs, []);
    return breadcrumbs;
  }

  /**
   * Build breadcrumb trail recursively
   */
  buildBreadcrumbs(items, targetPath, breadcrumbs, currentTrail) {
    for (const item of items) {
      const newTrail = [...currentTrail, item];
      
      if (item.route === targetPath) {
        breadcrumbs.push(...newTrail);
        return true;
      }
      
      if (item.children && targetPath.startsWith(item.route)) {
        if (this.buildBreadcrumbs(item.children, targetPath, breadcrumbs, newTrail)) {
          return true;
        }
      }
    }
    return false;
  }
}

export default new RouteGenerator();