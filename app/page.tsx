"use client";

import { useEffect, useRef, useState } from "react";
import RadioInput from "./components/RadioInput";

export default function Home() {
  let [sodaArray, setSodaArray] = useState([]);

  async function getSodaArray() {
    const response = await fetch("/api/julebrus")
      .then((response) => response.json())
      .then((data) => {
        setSodaArray(data);
      });
  }

  useEffect(() => {
    getSodaArray();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    (
      document.getElementById("why-am-i-using-id-for-this") as HTMLFormElement
    ).reset();
  };
  return (
    <main className="flex min-h-screen flex-col p-8 bg-[#bc4749]">
      <form
        className="flex flex-col gap-4 bg-[#F2E8CF] p-4 rounded"
        id="why-am-i-using-id-for-this"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold">Variants favorittjulebrus</h1>
        <label htmlFor="soda">
          Brus:
          <br />
          <select id="julebrusId" name="julebrusId">
            {sodaArray.map((soda: any) => (
              <option key={`select-brus-${soda.id}`} value={soda.id}>
                Brus {soda.id}
              </option>
            ))}
          </select>
        </label>
        <RadioInput id="color" name="color" label="Farge:" />
        <RadioInput id="smell" name="smell" label="Lukt:" />
        <RadioInput id="taste" name="taste" label="Smak:" />
        <input type="submit" />
      </form>
    </main>
  );
}
