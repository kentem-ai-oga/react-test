import React, { useState } from 'react';
import style from './App.module.css';
import FilterableBookTable from './components/BookManager/FilterableBookTable/filterableBookTable.tsx';
import InputForm from './components/BookRegister/InputForm/InputForm.tsx';
import RegistrationButton from './components/BookRegister/RegistrationButton/RegistrationButton.tsx';
import { BookItemModel } from './models';

const App: React.FC = () => {
  const [isbn, setIsbn] = useState('');
  const [books, setBooks] = useState<BookItemModel[]>([]);

  const handleClickButton = (): void => {
    // ISBNコードが入力されていないときはアラート
    if (isbn === '') {
      alert('ISBNコードを入力してください。');
      return;
    }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.totalItems === 0) {
          alert('登録されていない ISBN コードです。');
          return;
        }
        // 登録済みの場合は登録済みであることを教えて登録しない
        if (isDuplicate(data.items[0].volumeInfo.title)) {
          alert('登録済みの書籍です。');
          return;
        }
        onPostCompleted({
          name: data.items[0].volumeInfo.title,
          isOnLoan: false,
        });
      });
  };

  // 登録済みの書籍かどうかを判定
  const isDuplicate = (title: string): boolean => {
    return books.some((book) => book.name === title);
  };

  const onPostCompleted = (postedItem: Omit<BookItemModel, 'id'>): void => {
    setBooks((prev) => [
      ...prev,
      {
        id: prev.length.toString(),
        ...postedItem,
      },
    ]);
  };

  // idが一致する本をbooksから削除
  const deleteBooks = (id: string): void => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // idが一致する本の貸出 or 返却についてbooksのisOnLoanプロパティを切り替え
  const switchLendingBooks = (id: string): void => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isOnLoan: !book.isOnLoan } : book,
      ),
    );
  };

  return (
    <div className={style.App}>
      {/* 第1問：コンポーネントに分割 ↓ ↓ ↓ ↓ ↓ */}
      <InputForm isbn={isbn} setIsbn={setIsbn} />
      <RegistrationButton handleClickButton={handleClickButton} />
      {/* 第1問：コンポーネントに分割 ↑ ↑ ↑ ↑ ↑ ↑ */}
      <hr />
      <FilterableBookTable
        books={books}
        onClickDelete={(id) => {
          {
            /* 第2問：貸出 or 返却 or 削除の処理を追加 */
            deleteBooks(id);
          }
        }}
        onClickLendingSwitch={(id) => {
          {
            /* 第2問：貸出 or 返却 or 削除の処理を追加 */
            switchLendingBooks(id);
          }
        }}
      />
    </div>
  );
};

export default App;
