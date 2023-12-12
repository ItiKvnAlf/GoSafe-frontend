import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { setStartPoint, setEndPoint } from '../redux/travelSlice';
import { useAppDispatch } from '../redux/hooks';
import { useEffect, useRef } from 'react';

interface MyMapProps {
  onOriginSelected: (latLng: L.LatLng) => void;
  onDestinationSelected: (latLng: L.LatLng) => void;
}

function createButton(label: string, container: HTMLElement) {
  const btn = document.createElement('button');
  btn.innerHTML = label;
  btn.addEventListener('click', function() {
    container.style.display = 'none';
  });
  container.appendChild(btn);
  return btn;
}

const MyMap: React.FC<MyMapProps> = ({ onOriginSelected, onDestinationSelected }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  const dispatch = useAppDispatch();

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

        const routingControl = L.Routing.control({
          waypoints: [],
          routeWhileDragging: true,
        }).addTo(map);
      
        mapInstanceRef.current = map;

        map.on('click', function(e) {
          var container = L.DomUtil.create('div'),
              startBtn = createButton('Iniciar desde esta ubicación', container),
              destBtn = createButton('Ir a esta ubicación', container);
              
      
          L.popup()
              .setContent(container)
              .setLatLng(e.latlng)
              .openOn(map);

          L.DomEvent.on(startBtn, 'click', function() {
            const waypoint = L.Routing.waypoint(e.latlng);
            console.log(waypoint.latLng);
            dispatch(setStartPoint({
              startPoint_long: waypoint.latLng.lng.toString(),
              startPoint_lat: waypoint.latLng.lat.toString(),
            }));
            routingControl.spliceWaypoints(0, 1, waypoint);
            map.closePopup();
        });

        L.DomEvent.on(destBtn, 'click', function() {
          const waypoint = L.Routing.waypoint(e.latlng);
          console.log(waypoint.latLng);
          dispatch(setEndPoint({
            endPoint_long: waypoint.latLng.lng.toString(),
            endPoint_lat: waypoint.latLng.lat.toString(),
          }));
          routingControl.spliceWaypoints(routingControl.getWaypoints().length - 1, 1, waypoint);
            map.closePopup();
        });
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