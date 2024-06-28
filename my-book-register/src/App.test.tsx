import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import App from './App.tsx';

beforeEach(() => {
  render(<App />);
});
afterEach(() => {
  cleanup();
});

const user = userEvent.setup();

describe('本のテーブル', () => {
  beforeEach(async () => {
    const inputText = screen.getByLabelText('inputForm');
    await user.type(inputText, '9784295007333');
    await user.click(screen.getByRole('button', { name: '書籍登録' }));
    await screen.findByText('1週間でC#の基礎が学べる本');
  });
  test('書籍が登録できており、利用可能になっている', async () => {
    expect(screen.getByText('利用可能')).toBeInTheDocument();
  });
  test('貸出ボタンを押すと利用状況が貸出中に切り替わる', async () => {
    await user.click(screen.getByRole('button', { name: '貸出' }));
    expect(screen.getByText('貸出中')).toBeInTheDocument();
  });
  test('返却ボタンを押すと利用状況が利用可能に切り替わる', async () => {
    await user.click(screen.getByRole('button', { name: '貸出' }));
    await user.click(screen.getByRole('button', { name: '返却' }));
    expect(screen.getByText('利用可能')).toBeInTheDocument();
  });
  test('同じ本を登録することができない', async () => {
    const inputText = screen.getByLabelText('inputForm');
    await user.type(inputText, '9784295007333');
    await user.click(screen.getByRole('button', { name: '書籍登録' }));
    const bookList = screen.getAllByText('1週間でC#の基礎が学べる本');
    expect(bookList.length).toBe(1);
  });
  test('削除ボタンを押すと本が削除される', async () => {
    await user.click(screen.getByRole('button', { name: '削除' }));
    expect(
      screen.queryByText('1週間でC#の基礎が学べる本'),
    ).not.toBeInTheDocument();
  });
  test('フィルターに値を入力すると絞り込まれる', async () => {
    const textboxes = screen.getAllByRole('textbox');
    await user.type(textboxes[1], 'C');
    expect(screen.getByText('1週間でC#の基礎が学べる本')).toBeInTheDocument();
  });
  test('フィルターに関係ない値を入力しても何も表示されない', async () => {
    const textboxes = screen.getAllByRole('textbox');
    await user.type(textboxes[1], 'A');
    expect(
      screen.queryByText('1週間でC#の基礎が学べる本'),
    ).not.toBeInTheDocument();
  });
});
