import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        const map = L.map(mapRef.current, {
          center: [-29.96577538141014, -71.3509081684784],
          zoom: 15,
          preferCanvas: true,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          detectRetina: false,
        }).addTo(map);

        mapInstanceRef.current = map;

        setTimeout(() => {
          map.invalidateSize();
        }, 0);
      }
    };

    initializeMap();

    window.addEventListener('resize', initializeMap);

    return () => {
      window.removeEventListener('resize', initializeMap);
    };
  }, []);

  return <div ref={mapRef} style={{ height: '65%', marginLeft: '2%', marginRight: '2%', marginTop: '2%' }} />;
};

export default MyMap;