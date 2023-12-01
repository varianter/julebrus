"use client";

import RadioInput from "./components/RadioInput";

export default function Home() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await fetch("/api/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <main className="flex min-h-screen flex-col p-8">
      <h1 className="text-4xl font-bold">Julebrus</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="soda">
          Brus:
          <br />
          <select id="julebrusId" name="julebrusId">
            <option value="1">Brus 1</option>
            <option value="2">Brus 2</option>
            <option value="3">Brus 3</option>
          </select>
        </label>
        <RadioInput id="color" name="color" label="Farge" />
        <RadioInput id="smell" name="smell" label="Lukt" />
        <RadioInput id="taste" name="taste" label="Smak" />
        <input type="submit" />
      </form>
    </main>
  );
}
