

function Input({ placeholder, type, id, name, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        onChange={onChange}
        className="mb-2 appearance-none rounded py-2 px-3 text-color2 leading-tight focus:outline-none focus:shadow-outline w-full justify-center shadow-xl"
      />
    </div>
  );
}

export default Input;