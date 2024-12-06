import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Toast from "./Toast";

export default function FormContact() {
  const [responseMessage, setResponseMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
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
      setData({
        name: "",
        email: "",
        message: "",
      });
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
          className="block mb-2 text-sm font-medium text-white "
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
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="Email"
          className="block mb-2 text-sm font-medium text-white "
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
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-white "
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
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />
      </div>

      <button
        className="text-white bg-mc3  focus:ring-4 focus:outline-none focus:ring-mc3 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar"}
      </button>
      {responseMessage && (
        <Toast status={responseMessage} setStatus={setResponseMessage} />
      )}
    </form>
  );
}
