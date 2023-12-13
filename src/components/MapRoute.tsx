import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LRM from 'leaflet-routing-machine';
import { useEffect, useRef } from 'react';

interface MyMapProps {
    onOriginSelected: L.LatLng;
    onDestinationSelected: L.LatLng;
  }

const MyMapRoute: React.FC<MyMapProps> = ({ onOriginSelected, onDestinationSelected }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const waypointStart = L.Routing.waypoint(onOriginSelected)
    const waypointEnd = L.Routing.waypoint(onDestinationSelected)
  
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
  
          L.Routing.control({
            waypoints: [waypointStart, waypointEnd],
            show: false,
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
    }, [onOriginSelected, onDestinationSelected]);
  
    return <div ref={mapRef} style={{ height: '50%', marginLeft: '2%', marginRight: '2%', marginTop: '2%' }} />;
  };
  
  export default MyMapRoute;