import { useEffect, useState } from "react";
import "@/assets/style.css";
const Toast = ({ status, setStatus }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (status) {
      // Mostrar el Toast con la animación de entrada
      setIsVisible(true);
      // Después de 5 segundos, ocultar el Toast y cambiar el estado
      const timer1 = setTimeout(() => {
        // Esperar a que termine la animación de salida para cambiar el estado a false
        setTimeout(() => {
          setIsVisible(false);
        }, 400); // Duración de la animación de salida
      }, 4000);
      // Después de 5 segundos, ocultar el Toast y cambiar el estado
      const timer2 = setTimeout(() => {
        // Esperar a que termine la animación de salida para cambiar el estado a false
        setTimeout(() => {
          setStatus(false);
        }, 500);
      }, 5000);

      return () => clearTimeout(timer1, timer2);
    }
  }, [status, setStatus]);

  return (
    <>
      {status && (
        <div
          id="toast-simple"
          className={`z-50 flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800 ${
            isVisible ? "slide-top" : "slide-out-top"
          }`}
          role="alert"
        >
          <svg
            className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
            ></path>
          </svg>
          <div className="ps-4 text-sm font-normal">
            Mensaje enviado correctamente.
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
