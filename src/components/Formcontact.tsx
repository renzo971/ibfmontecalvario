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
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" autoComplete="name" required />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
        />
      </label>
      <label htmlFor="message">
        Message
        <textarea id="message" name="message" autoComplete="off" required />
      </label>
      <button disabled={isLoading}>{isLoading ? "Enviando..." : "Send"}</button>
      {responseMessage && <Toast />}
    </form>
  );
}
