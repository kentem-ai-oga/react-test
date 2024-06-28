import React from 'react';

type RegistrationButtonProps = {
  handleClickButton: () => void;
};

const RegistrationButton: React.FC<RegistrationButtonProps> = ({
  handleClickButton,
}) => {
  return (
    <>
      <button className="button" onClick={handleClickButton}>
        書籍登録
      </button>
    </>
  );
};

export default RegistrationButton;
