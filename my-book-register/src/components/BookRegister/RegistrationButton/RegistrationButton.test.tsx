import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect } from 'vitest';
import RegistrationButton from './RegistrationButton.tsx';

type RegistrationButtonProps = {
  handleClickButton: () => void;
};

describe('Init State', () => {
  test('testURL', async () => {
    render(<RegistrationButton detailURL="https://testURL" />);

    expect('吾輩は猫である').toBeInTheDocument();
  });
});
