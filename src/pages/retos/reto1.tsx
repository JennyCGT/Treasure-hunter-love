import { useState } from 'react';
import RetoCard from '../../component/RetoCard';

export default function Reto1() {
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');

  const checkRespuesta = () => {
    if (respuesta.trim() === '47') {
      setFeedback('¡Correcto! Has resuelto el acertijo.');
    } else {
      setFeedback('Incorrecto, intenta de nuevo.');
    }
  };

  return (
    <RetoCard
      title="Reto 1: Acertijo Lógico"
      description="Si A = 1, B = 2... ¿cuál es el número correspondiente a AMOR?"
    >
      <input
        type="text"
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        placeholder="Escribe tu respuesta aquí"
      />
      <button onClick={checkRespuesta}>Comprobar</button>
      <p>{feedback}</p>
    </RetoCard>
  );
}
