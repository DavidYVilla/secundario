import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [role, setRole] = useState(localStorage.getItem('role') || 'guest');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // 🔥 Manejo de autenticación con OAuth (Google y Facebook)
  useEffect(() => {
    const handleOAuthMessage = (event) => {
      if (event.origin !== API_URL) return;
      if (!event.data.token) {
        console.error(
          '❌ Token inválido o datos de autenticación incompletos.'
        );
        return;
      }

      try {
        const decoded = JSON.parse(atob(event.data.token.split('.')[1]));
        console.log('🔎 Token decodificado:', decoded);

        const extractedUsername = decoded.username || 'Usuario desconocido';
        const extractedRole = decoded.role || 'guest';

        localStorage.setItem('token', event.data.token);
        localStorage.setItem('username', extractedUsername);
        localStorage.setItem('role', extractedRole);

        console.log(
          `✅ Usuario autenticado: ${extractedUsername} | Rol: ${extractedRole}`
        );
        setUsername(extractedUsername);
        setRole(extractedRole);
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

  // 🔥 Manejo de autenticación manual (correo y contraseña)
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('✅ Datos recibidos en login:', data);

        localStorage.setItem('token', data.token);

        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
        console.log('🔎 Token decodificado:', decodedToken);

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

  // 🔥 Manejo de registro de usuario
  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('✅ Registro exitoso:', data);
        setIsRegistering(false); // Cambiar a login después del registro
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

          {/* 🔥 Formulario de autenticación / registro */}
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
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600"
            >
              {isRegistering ? '🆕 Registrarse' : '🔒 Iniciar sesión'}
            </button>
          </div>

          {/* 🔥 Botones de OAuth */}
          <button
            onClick={() =>
              window.open(
                `${API_URL}/auth/google`,
                '_blank',
                'width=500,height=600'
              )
            }
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg w-full hover:bg-red-600"
          >
            🔵 Iniciar sesión con Google
          </button>
          <button
            onClick={() =>
              window.open(
                `${API_URL}/auth/facebook`,
                '_blank',
                'width=500,height=600'
              )
            }
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-700"
          >
            🔵 Iniciar sesión con Facebook
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
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg w-full hover:bg-gray-600"
          >
            ❌ Cancelar
          </button>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
