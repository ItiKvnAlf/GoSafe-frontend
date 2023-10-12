import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map<number, L.Map> | undefined>(undefined);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([-29.95332, -71.33947], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
      }).addTo(map);

      mapInstanceRef.current = new Map<number, L.Map>([[0, map]]);
    }
  }, []);

  return <div ref={mapRef} style={{ height: '65%',  marginLeft: '2%', marginRight: '2%', marginTop: '2%'}} />
};

export default MyMap;