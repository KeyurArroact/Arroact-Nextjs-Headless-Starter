'use client';

import { useEffect, useRef } from 'react';

interface MapData {
  Zoom: number;
  Marker: {
    Latitude: number;
    Longitude: number;
  };
  BoundingBox?: {
    NorthEastCorner: {
      Latitude: number;
      Longitude: number;
    };
    SouthWestCorner: {
      Latitude: number;
      Longitude: number;
    };
  };
  Configuration?: {
    TileLayer?: string;
    TileLayerAttribution?: string;
    ScrollWheelZoom?: boolean;
  };
}

interface OpenStreetMapProps {
  mapData: string | MapData;
  height?: string;
}

export default function OpenStreetMap({ mapData, height = '400px' }: OpenStreetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    let parsedData: MapData;
    try {
      parsedData = typeof mapData === 'string' ? JSON.parse(mapData) : mapData;
    } catch (error) {
      console.error('Failed to parse map data:', error);
      return;
    }

    const loadMap = async () => {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const L = (await import('leaflet')).default;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const map = L.map(mapRef.current!).setView(
        [parsedData.Marker.Latitude, parsedData.Marker.Longitude],
        parsedData.Zoom
      );

      const tileLayer = parsedData.Configuration?.TileLayer || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const attribution = parsedData.Configuration?.TileLayerAttribution || 'Map data © OpenStreetMap contributors';

      L.tileLayer(tileLayer, {
        attribution: attribution,
        maxZoom: 19,
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      L.marker([parsedData.Marker.Latitude, parsedData.Marker.Longitude], {
        icon: customIcon
      }).addTo(map);

      if (parsedData.Configuration?.ScrollWheelZoom === false) {
        map.scrollWheelZoom.disable();
      }

      mapInstanceRef.current = map;
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapData]);

  return <div ref={mapRef} style={{ height, width: '100%' }} />;
}
