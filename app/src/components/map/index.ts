// @ts-nocheck
/**
 * Map module exports
 * Provides clean imports for map-related components and services
 */

export * from '../../decorators/map/LayerDecorator';
export { ColorCalculator } from '../../services/map/ColorCalculator';
export { FeatureBuilder } from '../../services/map/FeatureBuilder';
export { MapService } from '../../services/map/MapService';
export { TileLayerFactory as LayerFactory } from '../../strategies/map/LayerStrategy';
export { MarkerFactory, TileLayerFactory } from '../../strategies/map/MarkerStrategy';
export { default as MapView } from './MapView';
