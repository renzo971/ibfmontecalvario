import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Toast from "./Toast";

export default function FormContact() {
  const [responseMessage, setResponseMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true); // Mostrar loading al enviar
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbymlSBmlCxBoYwvnNNqgf-pEk7G8Hts1K110_PzTmKZGcsRXlwHImEhi1-psHF4_qkS/exec",
      {
        method: "POST",
        body: formData,
      }
    );
    console.log(formData);

    const data = await response.json();

    if (data.success === true) {
      setResponseMessage(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (responseMessage === true) {
      setTimeout(() => {
        setResponseMessage(false);
      }, 5000);
    }
  }, [responseMessage]);
  return (
    <form onSubmit={submit}>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Nombre..."
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="Email"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          autoComplete="email"
          placeholder="Emal..."
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Mensaje
        </label>
        <textarea
          id="message"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          name="message"
          autoComplete="off"
          placeholder="Dejanos un mensaje..."
          required
        />
      </div>

      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar"}
      </button>
      {responseMessage && <Toast />}
    </form>
  );
}
