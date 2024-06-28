import React from 'react';

type InputFormProps = {
  isbn: string;
  setIsbn: (isbn: string) => void;
};

const InputForm: React.FC<InputFormProps> = ({ isbn, setIsbn }) => {
  return (
    <>
      <label className="label">ISBNコード</label>
      <input
        className="input"
        placeholder="入力してください"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      ></input>
    </>
  );
};

export default InputForm;
