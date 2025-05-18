'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthCallback = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          alert('Error en la autenticación: código no recibido.');
          router.replace('/login');
          return;
        }

        console.log('🔍 Código recibido:', code);

        // ✅ Hacer solicitud manual al backend para intercambiar el código por el token
        const response = await fetch(
          'http://localhost:5000/auth/google/token',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }), // ✅ Enviar el código dentro del cuerpo de la solicitud
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error en la respuesta del backend: ${response.status}`
          );
        }

        const data = await response.json();
        console.log('📩 Datos de autenticación recibidos:', data);

        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log(
            '✅ Token guardado en localStorage:',
            localStorage.getItem('token')
          );

          alert(`¡Bienvenido, ${data.user.username}! 🎉`);

          const redirectUrl = data.redirectUrl || '/';
          console.log('🚀 Redirigiendo a:', redirectUrl);

          setTimeout(
            () => router.replace(decodeURIComponent(redirectUrl)),
            500
          );
        } else {
          alert('Error en la autenticación. Intenta de nuevo.');
          router.replace('/login');
        }
      } catch (error) {
        console.error('❌ Error al obtener datos de autenticación:', error);
        alert('Error al procesar la autenticación.');
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading ? (
        <p className="text-lg font-semibold">Procesando autenticación...</p>
      ) : null}
    </div>
  );
};

export default AuthCallback;
