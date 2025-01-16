'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '../../../styles/Reto6.module.css';
import L from 'leaflet';

// Crear un nuevo ícono de Leaflet
const customIcon = new L.Icon({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

// Cargar componentes de react-leaflet dinámicamente para evitar problemas de SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function Reto6() {
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrent] = useState(0);
  const router = useRouter();
  const maxAttempts = 2;

  useEffect(() => {
    if (localStorage.getItem('reto5Completed') !== 'true') {
      router.push('/');
    }
  }, [router]);

  const handleMarkerClick = (location: string) => {
    if (location === 'correct') {
        const newcorrect = correct + 1;
      setCorrent(newcorrect);
      setFeedback('¡Correcto! 🌏 Has encontrado uno de los países que me gustaría visitar.');
      localStorage.setItem('reto6Completed', 'true');
      if(newcorrect==3){
        setFeedback('¡Correcto! Has completado el reto me encantaria conocerlos contigo. 💖');
        setTimeout(() => router.push('/retos/reto7'), 2000);

      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts > maxAttempts) {
        setFeedback('❌ Has alcanzado el límite de intentos. Inténtalo de nuevo.');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setFeedback(`Esta no es la ubicación correcta. Te quedan ${maxAttempts - newAttempts} intentos.`);
      }
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>🌏 Reto 6: Explora mis Sueños</h2>
      <p className={styles.description}>
        En este mapa están marcados algunos lugares del mundo. Entre ellos, hay tres países que sueño con visitar: Japón, Italia y Reino Unido.
        Ordena tus ideas y elige con cuidado, ¡solo tienes 2 intentos de equivocarte! 🌸
      </p>
      <div className={styles.mapContainer}>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {/* Marcadores correctos */}
          <Marker
            position={[35.6895, 139.6917]} // Japón
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('correct') }}
          >
            <Popup>¡Correcto! Este es Japón.</Popup>
          </Marker>
          <Marker
            position={[41.9028, 12.4964]} // Italia
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('correct') }}
          >
            <Popup>¡Correcto! Este es Italia.</Popup>
          </Marker>
          <Marker
            position={[51.5098, -0.118]} // Reino Unido
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('correct') }}
          >
            <Popup>¡Correcto! Este es Reino Unido.</Popup>
          </Marker>
          {/* Marcadores incorrectos */}
          <Marker
            position={[-1.8312, -78.1834]} // Ecuador
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('incorrect') }}
          >
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker
            position={[40.7128, -74.006]} // EE.UU.
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('incorrect') }}
          >
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker
            position={[34.0522, -118.2437]} // Los Ángeles
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('incorrect') }}
          >
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker
            position={[48.8566, 2.3522]} // Francia
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('incorrect') }}
          >
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker
            position={[39.9042, 116.4074]} // China
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('incorrect') }}
          >
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker
            position={[-33.8688, 151.2093]} // Australia
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('incorrect') }}
          >
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker
            position={[55.7558, 37.6173]} // Moscu
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('incorrect') }}
          >
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker
            position={[-23.5505, -46.6333] } // Sa Pablo
            icon={customIcon}
            eventHandlers={{ click: () => handleMarkerClick('incorrect') }}
          >
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker position={[-9.189967, -75.015152]} icon={customIcon} eventHandlers={{ click: () => handleMarkerClick('incorrect') }}>
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker position={[37.7749, 127.4194]} icon={customIcon} eventHandlers={{ click: () => handleMarkerClick('incorrect') }}>
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker position={[40.4637, -3.7492]} icon={customIcon} eventHandlers={{ click: () => handleMarkerClick('incorrect') }}>
            <Popup>Esta no es la ubicación correcta.</Popup>
          </Marker>
          <Marker position={[60.1282, 18.6435]} icon={customIcon} eventHandlers={{ click: () => handleMarkerClick('incorrect') }}>
            <Popup> Esta no es la ubicación correcta.</Popup>
            </Marker>
        </MapContainer>
      </div>
      <p className={styles.feedback}>{feedback}</p>
    </div>
  );
}
