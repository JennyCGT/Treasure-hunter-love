import type { AppProps } from 'next/app';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Sobrescribir opciones de íconos en Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;
