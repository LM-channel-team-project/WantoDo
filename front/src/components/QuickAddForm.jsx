import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from './Button';
import IconButton from './IconButton';
import Input from './Input';
import styles from '../styles/QuickAddForm.module.css';

const QuickAddForm = () => {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <IconButton Icon={FaPlus} styleName="QuickAddForm__icon" />
      <Input name="content" styleName="QuickAddForm" placeholder="나의 할 일 작성하기" />
      <Button styleName="QuickAddForm" type="submit">
        등록
      </Button>
    </form>
  );
};

export default QuickAddForm;
