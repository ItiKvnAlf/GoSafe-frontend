import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

interface MyMapProps {
  onOriginSelected: (latLng: L.LatLng) => void;
  onDestinationSelected: (latLng: L.LatLng) => void;
}

const MyMap: React.FC<MyMapProps> = ({ onOriginSelected, onDestinationSelected }) => {
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
          attribution: '© OpenStreetMap',
          detectRetina: false,
        }).addTo(map);

        map.on('click', (e: L.LeafletMouseEvent) => {
          if (onOriginSelected && onDestinationSelected) {
            L.marker(e.latlng).addTo(map);
            if (Math.random() > 0.5) {
              onOriginSelected(e.latlng);
            } else {
              onDestinationSelected(e.latlng);
            }
          }
        });

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
  }, [onOriginSelected, onDestinationSelected]);

  return <div ref={mapRef} style={{ height: '65%', marginLeft: '2%', marginRight: '2%', marginTop: '2%' }} />;
};

export default MyMap;