import RadioInput from "./components/RadioInput";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col p-8'>
      <h1 className='text-4xl font-bold'>Julebrus</h1>
      <form action='/api/vote' className='flex flex-col gap-4'>
        <label htmlFor='soda'>
          Brus:
          <br />
          <select id='julebrusId' name='julebrusId'>
            <option value='1'>Brus 1</option>
            <option value='2'>Brus 2</option>
            <option value='3'>Brus 3</option>
          </select>
        </label>
        <RadioInput id='color' name='color' label='Farge' />
        <RadioInput id='smell' name='smell' label='Lukt' />
        <RadioInput id='taste' name='taste' label='Smak' />
        <input type='submit' />
      </form>
    </main>
  );
}
