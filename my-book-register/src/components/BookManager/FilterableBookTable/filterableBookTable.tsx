import { ChangeEventHandler, useState } from 'react';
import { BookItemModel } from '../../../models';
import BookTable from '../BookTable/bookTable';
import style from './filterableBookTable.module.css';

interface Props {
  books: BookItemModel[];
  onClickDelete: (id: string) => void;
  onClickLendingSwitch: (id: string) => void;
}

const FilterableBookTable = ({
  books,
  onClickDelete,
  onClickLendingSwitch,
}: Props) => {
  const [filterText, setFilterText] = useState('');

  const handleChangeFilterText: ChangeEventHandler<HTMLInputElement> = (e) =>
    setFilterText(e.target.value);

  return (
    <div className="filterable-book-table">
      <div className="label-input">
        <label className={style.label}>filter</label>
        <input
          className={style.input}
          placeholder="入力してください"
          value={filterText}
          onChange={handleChangeFilterText}
        ></input>
      </div>
      <BookTable
        bookItems={books.filter(
          (x) => !filterText || x.name.includes(filterText),
        )}
        onClickDelete={onClickDelete}
        onClickLendingSwitch={onClickLendingSwitch}
      />
    </div>
  );
};
export default FilterableBookTable;