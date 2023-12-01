"use client";

import { useEffect, useState } from "react";
import RadioInput from "./components/RadioInput";

type Soda = {
  id: number;
};

export const fetchCache = "force-no-store";

export default function Home() {
  let [sodaArray, setSodaArray] = useState<Soda[]>([]);
  let [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const [color, setColor] = useState(0);
  const [smell, setSmell] = useState(0);
  const [taste, setTaste] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  function getSodaArray() {
    const voted = localStorage.getItem("voted-sodas") ?? "";

    fetch("/api/julebrus", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: Soda[]) => {
        data.sort((a, b) => a.id - b.id);
        setSodaArray(
          data.filter((soda) => voted.includes(soda.id.toString()) === false)
        );
      })
      .then(() => setHasLoaded(true));
  }

  useEffect(() => {
    getSodaArray();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (color === 0 || smell === 0 || taste === 0) {
      setErrorMessage("Du må velge en verdi for alle kategorier!");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const data = {
      ...Object.fromEntries(formData.entries()),
      color,
      smell,
      taste,
    } as any;

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

    setColor(0);
    setSmell(0);
    setTaste(0);
  };
  return (
    <main className="flex min-h-screen flex-col pt-16 p-8 items-center">
      <form
        className="flex flex-col gap-4 bg-[#F2E8CF] p-4 rounded max-w-sm z-10"
        onSubmit={handleSubmit}
        onClick={() => setErrorMessage("")}
      >
        <h1 className="text-2xl font-bold mb-8">
          Variants årlige juletradisjon der vi stemmer på hvilken julebrus som
          er best
        </h1>
        {(!hasLoaded || sodaArray.length !== 0) && (
          <>
            <label htmlFor="julebrusId">
              Brus:
              <br />
              <select
                id="julebrusId"
                name="julebrusId"
                className="mb-4 p-2 min-w-[15rem] rounded"
              >
                {sodaArray.map((soda: any) => (
                  <option key={`select-brus-${soda.id}`} value={soda.id}>
                    Brus {soda.id}
                  </option>
                ))}
              </select>
            </label>
            <RadioInput
              id="color"
              name="color"
              label="Farge:"
              value={color}
              setter={setColor}
            />
            <RadioInput
              id="smell"
              name="smell"
              label="Lukt:"
              value={smell}
              setter={setSmell}
            />
            <RadioInput
              id="taste"
              name="taste"
              label="Smak:"
              value={taste}
              setter={setTaste}
            />
            <button type="submit" className="bg-[#6A994E] rounded py-2 mt-8">
              Send inn
            </button>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
            )}
          </>
        )}
        {hasLoaded && sodaArray.length === 0 && (
          <>
            <p className="text-xl">Du har stemt på all julebrusen!</p>
            <p className="text-l">Resultatene kommer snart 🎅🏻</p>
          </>
        )}
      </form>
    </main>
  );
}
