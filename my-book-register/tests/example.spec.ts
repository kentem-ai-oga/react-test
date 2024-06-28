import { expect, test } from '@playwright/test';

test.describe('App Component', () => {
  test.beforeEach(async ({ page }) => {
    // アプリケーションのURLに移動
    await page.goto('http://localhost:5173/react-practice/');
  });

  test('ISBNコードの入力欄が空のまま登録ボタンを押したときにアラートを表示するかどうか', async ({
    page,
  }) => {
    const registrationButton = page.getByRole('button', { name: '書籍登録' });

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('ISBNコードを入力してください。');
      await dialog.accept();
    });

    await registrationButton.click();
  });

  test('本を登録できるかどうか', async ({ page }) => {
    const isbnInput = page.getByLabel('inputForm');
    const registrationButton = page.getByRole('button', { name: '書籍登録' });

    await isbnInput.fill('9784167158057'); // 「吾輩は猫である」のISBN
    await registrationButton.click();

    // 本が登録されたことを確認
    await expect(page.getByText('吾輩は猫である')).toBeVisible();
  });

  test('既に登録済みの本を登録しようとするとアラートが表示されるかどうか', async ({
    page,
  }) => {
    const isbnInput = page.getByLabel('inputForm');
    const registrationButton = page.getByRole('button', { name: '登録' });

    // 最初に本を登録
    await isbnInput.fill('9784167158057');
    await registrationButton.click();

    // 同じ本を再度登録
    await isbnInput.fill('9784167158057');

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('登録済みの書籍です。');
      await dialog.accept();
    });

    await registrationButton.click();
  });

  test('削除ボタンを押したら本を削除できるかどうか', async ({ page }) => {
    // 本を登録
    const isbnInput = page.getByLabel('inputForm');
    const registrationButton = page.getByRole('button', { name: '登録' });

    await isbnInput.fill('9784167158057');
    await registrationButton.click();

    // 削除ボタンをクリック
    const deleteButton = page.getByRole('button', { name: '削除' });
    await deleteButton.click();

    // 本が削除されたことを確認
    await expect(page.getByText('吾輩は猫である')).not.toBeVisible();
  });

  test('貸出・返却ボタンで本の貸出状態を切り替えられるかどうか', async ({
    page,
  }) => {
    // 本を登録
    const isbnInput = page.getByLabel('inputForm');
    const registrationButton = page.getByRole('button', { name: '登録' });

    await isbnInput.fill('9784167158057');
    await registrationButton.click();

    // 貸出ボタンをクリック
    const lendButton = page.getByRole('button', { name: '貸出' });
    await lendButton.click();

    // 貸出状態になったことを確認
    await expect(page.getByRole('button', { name: '返却' })).toBeVisible();

    // 返却ボタンをクリック
    const returnButton = page.getByRole('button', { name: '返却' });
    await returnButton.click();

    // 返却状態になったことを確認
    await expect(page.getByRole('button', { name: '貸出' })).toBeVisible();
  });
});
