interface RadioInputProps {
  id: string;
  name: string;
  label: string;
  maxValue?: number;
}

const RadioInput = ({ id, name, label, maxValue = 5 }: RadioInputProps) => {
  return (
    <label htmlFor='id' className=''>
      {label}
      <br />
      {Array.from(Array(maxValue).keys()).map((i) => (
        <label key={`${id}-${i + 1}`}>
          <input type='radio' id={`${id}-${i + 1}`} name={name} value={i + 1} />
          {i + 1}{" "}
        </label>
      ))}
    </label>
  );
};

export default RadioInput;
