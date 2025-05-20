import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('guest');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsername(localStorage.getItem('username') || '');
      setRole(localStorage.getItem('role') || 'guest');
      setIsAuthenticated(!!localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    const handleOAuthMessage = (event) => {
      if (event.origin !== API_URL || !event.data.token) {
        console.error(
          '❌ Token inválido o datos de autenticación incompletos.'
        );
        return;
      }

      try {
        const decoded = JSON.parse(atob(event.data.token.split('.')[1]));
        console.log('🔎 Token decodificado:', decoded);

        localStorage.setItem('token', event.data.token);
        localStorage.setItem(
          'username',
          decoded.username || 'Usuario desconocido'
        );
        localStorage.setItem('role', decoded.role || 'guest');

        setUsername(decoded.username);
        setRole(decoded.role);
        setIsAuthenticated(true);
        onAuthSuccess?.();
        onClose();
      } catch (error) {
        console.error('❌ Error al decodificar el token:', error);
      }
    };

    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, [onAuthSuccess, onClose]);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));

        localStorage.setItem('username', decodedToken.username);
        localStorage.setItem('role', decodedToken.role);

        setUsername(decodedToken.username);
        setRole(decodedToken.role);
        setIsAuthenticated(true);
        onAuthSuccess?.();
        onClose();
      } else {
        setErrorMessage(data.message || 'Error en la autenticación.');
      }
    } catch (error) {
      console.error('❌ Error en la autenticación:', error);
      setErrorMessage('Error al conectarse con el servidor.');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsRegistering(false);
      } else {
        setErrorMessage(data.message || 'Error en el registro.');
      }
    } catch (error) {
      console.error('❌ Error en el registro:', error);
      setErrorMessage('Error al conectarse con el servidor.');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex items-center justify-center z-[60]"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 pointer-events-none" />
        <Dialog.Panel className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl max-w-md w-full text-center relative z-[70]">
          <Dialog.Title className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            {isRegistering ? '🆕 Crear Cuenta' : '🔒 Iniciar Sesión'}
          </Dialog.Title>

          {errorMessage && (
            <p className="text-red-500 dark:text-red-400 text-sm">
              {errorMessage}
            </p>
          )}

          <div className="mt-4 space-y-3">
            {isRegistering && (
              <input
                type="text"
                placeholder="Nombre completo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border dark:border-gray-700 rounded w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            )}
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border dark:border-gray-700 rounded w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border dark:border-gray-700 rounded w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button
              onClick={isRegistering ? handleRegister : handleLogin}
              className="relative mt-6 w-full h-12 flex items-center justify-center bg-blue-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-blue-600"
            >
              {isRegistering ? '🆕 Registrarse' : '🔒 Iniciar sesión'}
            </button>
          </div>

          <button
            onClick={() =>
              window.open(
                `${API_URL}/auth/google`,
                '_blank',
                'width=500,height=600'
              )
            }
            className="relative mt-6 w-full h-12 flex items-center justify-center bg-gradient-to-r from-white-500 via-red-600 to-green-700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {/* Imagen del logo de Google */}
            <Image
              src="/google-icon.svg" // 🔥 Asegúrate de tener esta imagen en tu carpeta `public`
              alt="Google Login"
              width={32}
              height={32}
              className="absolute left-4"
            />
            <span className="text-white text-lg tracking-wide font-semibold glow-effect">
              Acceder con Google!.
            </span>
          </button>

          <button
            onClick={() =>
              window.open(
                `${API_URL}/auth/facebook`,
                '_blank',
                'width=500,height=600'
              )
            }
            className="relative mt-6 w-full h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 via-yellow-600 to-green -700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <Image
              src="/facebook-icon.svg" // 🔥 Asegúrate de tener esta imagen en tu carpeta `public`
              alt="Facebook Login"
              width={32}
              height={32}
              className="absolute left-4"
            />
            <span className="text-white text-lg tracking-wide font-semibold glow-effect">
              Acceder con Facebook!.
            </span>
          </button>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-500 text-sm"
            >
              {isRegistering
                ? '¿Ya tienes cuenta? Inicia sesión'
                : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>

          <button
            onClick={onClose}
            className="relative mt-6 w-full h-12 flex items-center justify-center bg-red-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-gray-600"
          >
            ❌ Cancelar
          </button>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
