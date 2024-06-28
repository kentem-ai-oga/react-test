import React from 'react';
import style from './RegistrationButton.module.css';

const RegistrationButton: React.FC<RegistrationButtonProps> = ({
  handleClickButton,
}) => {
  return (
    <>
      <button className={style.button} onClick={handleClickButton}>
        書籍登録
      </button>
    </>
  );
};

export default RegistrationButton;
