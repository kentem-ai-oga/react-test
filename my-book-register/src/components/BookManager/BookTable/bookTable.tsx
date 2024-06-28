import { BookItemModel } from '../../../models';
import BookRow from '../BookRow/bookRow';
import style from './bookTable.module.css';

interface Props {
  //書籍情報一覧のstate
  bookItems: BookItemModel[];
  onClickDelete: (id: string) => void;
  onClickLendingSwitch: (id: string) => void;
}

const BookTable = ({
  bookItems,
  onClickDelete,
  onClickLendingSwitch,
}: Props) => {
  return (
    <table border={1} className={style.table}>
      <thead className={style.thead}>
        <tr>
          <td>書籍名</td>
          <td>貸出状況</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        {bookItems.map((book) => (
          <BookRow
            bookItem={book}
            onClickDelete={onClickDelete}
            onClickLendingSwitch={onClickLendingSwitch}
            key={book.id}
          />
        ))}
      </tbody>
    </table>
  );
};
export default BookTable;
