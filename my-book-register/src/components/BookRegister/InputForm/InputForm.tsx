import React from 'react';
import style from './InputForm.module.css';

type InputFormProps = {
  isbn: string;
  setIsbn: (isbn: string) => void;
};

const InputForm: React.FC<InputFormProps> = ({ isbn, setIsbn }) => {
  return (
    <>
      <label className={style.label}>ISBNコード</label>
      <input
        className={style.input}
        placeholder="入力してください"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        aria-label="inputForm"
      ></input>
    </>
  );
};

export default InputForm;
