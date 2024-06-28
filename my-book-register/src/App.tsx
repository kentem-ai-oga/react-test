import React, { useState } from 'react';
import './App.css';
import InputForm from './components/BookRegister/InputForm/InputForm.tsx';
import RegistrationButton from './components/BookRegister/RegistrationButton/RegistrationButton.tsx';
import FilterableBookTable from './components/filterableBookTable';
import { BookItemModel } from './models';

const App: React.FC = () => {
  const [isbn, setIsbn] = useState('');
  const [books, setBooks] = useState<BookItemModel[]>([]);

  const handleClickButton = (): void => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.totalItems === 0) {
          alert('登録されていない ISBN コードです。');
          return;
        }
        onPostCompleted({
          name: data.items[0].volumeInfo.title,
          isOnLoan: false,
        });
      });
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

  const switchLendingBooks = (id: string): void => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, isOnLoan: !book.isOnLoan } : book,
      ),
    );
  };

  return (
    <div className="App">
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
