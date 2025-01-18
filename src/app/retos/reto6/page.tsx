'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '../../../styles/Reto6.module.css';
import L from 'leaflet';

// Cargar componentes de react-leaflet dinámicamente
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function Reto6() {
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null); // Tipo específico para customIcon
  const router = useRouter();
  const maxAttempts = 2;

  useEffect(() => {
    // Asegúrate de que el código solo se ejecute en el cliente
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('reto5Completed') !== 'true') {
        router.push('/');
      }

      // Cargar Leaflet dinámicamente y configurar el icono
      import('leaflet').then((L) => {
        const icon = new L.Icon({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          shadowSize: [41, 41],
        });
        setCustomIcon(icon);
      });
    }
  }, [router]);

  const handleMarkerClick = (location: string) => {
    if (location === 'correct') {
      const newCorrect = correct + 1;
      setCorrect(newCorrect);
      setFeedback('¡Correcto! 🌏 Has encontrado uno de los países que me gustaría visitar.');
      if (newCorrect === 3) {
        setFeedback('¡Correcto! Has completado el reto, me encantaría conocerlos contigo. 💖');
        localStorage.setItem('reto6Completed', 'true');
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

  if (!customIcon) {
    // Renderizar nada hasta que customIcon esté inicializado
    return null;
  }

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
          {/* Otros marcadores */}
        </MapContainer>
      </div>
      <p className={styles.feedback}>{feedback}</p>
    </div>
  );
}
