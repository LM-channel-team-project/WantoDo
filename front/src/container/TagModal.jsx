import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import Modal from './Modal';
import TagButton from '../components/TagButton';
import IconButton from '../components/IconButton';
import QuickAddForm from '../components/QuickAddForm';
import colorManager from '../utils/color-manager';
import accountManager from '../utils/account-manager';
import styles from '../styles/TagModal.module.css';

const makeSparkleTag = (tagId) => {
  const scrollTarget = document.querySelector(`li[data-tagId="${tagId}"]`);
  scrollTarget.scrollIntoView({ behavior: 'smooth' }); // 스크롤 이동

  // 반짝이는 애니메이션 보여줌
  const tagItem = scrollTarget.querySelector('div[data-type="tag"]');
  tagItem.classList.add(styles.bling);
  setTimeout(() => tagItem.classList.remove(styles.bling), 800);
};

const TagModal = ({ token, tags, updateTag, deleteTag, closeModal }) => {
  const onSubmit = async (name) => {
    if (name.length < 2) return;

    // 같은 이름의 태그가 있는지 검사
    let tag = Object.values(tags).find((_tag) => _tag.name === name);
    if (tag == null) {
      // 없으면 새롭게 추가
      tag = { name, color: colorManager.getRandomHex() };
      tag.tagId = await accountManager.addTag(token, tag);

      updateTag(tag.tagId, tag);
    }

    makeSparkleTag(tag.tagId);
  };

  const onTagDelete = (tagId) => {
    deleteTag(tagId);
    accountManager.deleteTag(token, tagId);
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
        <footer>
          <QuickAddForm
            placeholder="새로운 태그 추가하기 (최대 15자)"
            onSubmit={onSubmit}
            styleName="tagModal"
            validator={(text) => !text.includes(' ')}
          />
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
