"use client";

import { useEffect, useState } from "react";
import RadioInput from "./components/RadioInput";

type Soda = {
  id: number;
};

export default function Home() {
  let [sodaArray, setSodaArray] = useState<Soda[]>([]);

  function getSodaArray() {
    const voted = localStorage.getItem("voted-sodas") ?? "";

    fetch("/api/julebrus")
      .then((response) => response.json())
      .then((data: Soda[]) => {
        data.sort((a, b) => a.id - b.id);
        setSodaArray(data.filter((soda) => voted.includes(soda.id) === false));
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

    if (response.ok) {
      const voted = localStorage.getItem("voted-sodas") ?? "";
      localStorage.setItem("voted-sodas", voted + data.julebrusId);

      setSodaArray(
        [...sodaArray].filter((soda) => soda.id !== +data.julebrusId)
      );
    }

    (
      document.getElementById("why-am-i-using-id-for-this") as HTMLFormElement
    ).reset();
  };
  return (
    <main className="flex min-h-screen flex-col pt-16 p-8 bg-[#bc4749]">
      <form
        className="flex flex-col gap-4 bg-[#F2E8CF] p-4 rounded"
        id="why-am-i-using-id-for-this"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold">Variants favorittjulebrus</h1>
        {sodaArray.length !== 0 && (
          <>
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
          </>
        )}
        {sodaArray.length === 0 && (
          <>
            <p className="text-xl">Du har stemt på all julebrusen!</p>
            <p className="text-l">Resultatene kommer snart 🎅🏻</p>
          </>
        )}
      </form>
    </main>
  );
}
