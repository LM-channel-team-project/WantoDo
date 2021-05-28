import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import Modal from './Modal';
import TagButton from '../components/TagButton';
import IconButton from '../components/IconButton';
import QuickAddForm from '../components/QuickAddForm';
import AutoCompleteBox from './AutoCompleteBox';
import colorManager from '../utils/color-manager';
import accountManager from '../utils/account-manager';
import useInput from '../hooks/useInput';
import styles from '../styles/TagModal.module.css';

const makeSparkleTag = (tagId) => {
  const scrollTarget = document.querySelector(`li[data-tagId="${tagId}"]`);
  scrollTarget.scrollIntoView({ behavior: 'smooth' }); // 스크롤 이동

  // 반짝이는 애니메이션 보여줌
  const tagItem = scrollTarget.querySelector('div[data-type="tag"]');
  tagItem.classList.add(styles.bling);
  setTimeout(() => tagItem.classList.remove(styles.bling), 800);
};

const searchText = (list, text) =>
  Object.values(list)
    .reduce((arr, tag) => {
      if (text.length < 2) return [];

      if (tag.name.includes(text)) {
        arr.push(tag);
      }
      return arr;
    }, [])
    .sort((a, b) => a.name.length - b.name.length);

const TagModal = ({ token, tags, updateTag, deleteTag, closeModal, setAlert }) => {
  const { value, onChange, reset } = useInput();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (value === '') {
      setAlert({ display: true, message: '내용을 입력 해주세요', confirm: '확인' });
      return;
    }

    if (value.length < 2) return;

    // 같은 이름의 태그가 있는지 검사
    let tag = Object.values(tags).find((_tag) => _tag.name === value);
    if (tag == null) {
      // 없으면 새롭게 추가
      tag = { name: value, color: colorManager.getRandomHex() };
      tag.tagId = await accountManager.addTag(token, tag);

      updateTag(tag.tagId, tag);
    }

    makeSparkleTag(tag.tagId);
    reset();
  };

  const onTagDelete = (tagId) => {
    deleteTag(tagId);
    accountManager.deleteTag(token, tagId);
  };

  const onItemClick = (tag) => {
    updateTag(tag.tagId, tag);
    makeSparkleTag(tag.tagId);
    reset();
  };

  return (
    <Modal styleName="tagModal" isBG onBGClick={closeModal}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Tags</h1>
        </header>
        <ul className={styles.tags}>
          {Object.keys(tags).map((tagId) => (
            <li key={tagId} data-tagId={tagId}>
              <TagButton
                tagId={tagId}
                name={tags[tagId].name}
                color={colorManager.toName(tags[tagId].color)}
                onDelete={onTagDelete}
              />
            </li>
          ))}
        </ul>
        <footer className={styles.footer}>
          <QuickAddForm
            value={value}
            onChange={onChange}
            placeholder="새로운 태그 추가하기 (최대 15자)"
            onSubmit={onSubmit}
            styleName="tagModal"
            validator={(text) => !text.includes(' ')}
          />
          <div className={styles.autoCompleteWrapper}>
            <AutoCompleteBox list={searchText(tags, value)} onItemClick={onItemClick} />
          </div>
        </footer>
        <div className={styles.buttonWrapper}>
          <IconButton Icon={AiOutlineClose} styleName="tagClose" onClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ token, tags }) => {
  return { token, tags };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTag: (tagId, tag) => dispatch(actionCreators.updateTag(tagId, tag)),
    deleteTag: (tagId) => dispatch(actionCreators.deleteTag(tagId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagModal);
