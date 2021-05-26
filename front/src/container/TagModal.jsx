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

const TagModal = ({ token, tags, updateTag, deleteTag, closeModal }) => {
  const onSubmit = async (name) => {
    const tag = {
      name,
      color: colorManager.getRandomHex(),
    };

    const tagId = await accountManager.addTag(token, tag);
    updateTag(tagId, tag);
  };

  const onTagDelete = (tagId) => {
    deleteTag(tagId);
    // 서버에서 태그 삭제 요청 시 모든 태스크에서 해당 태그를 지워주지 않으면 에러 발생
    // 이 문제 해결 전까지 태그 삭제 요청 비활성화
    // accountManager.deleteTag(token, tagId);
  };

  const validator = (text) => {
    return !text.includes(' ');
  };

  return (
    <Modal styleName="tagModal" isBG onBGClick={closeModal}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Tags</h1>
        </header>
        <ul className={styles.tags}>
          {Object.keys(tags).map((tagId) => (
            <TagButton
              key={tagId}
              tagId={tagId}
              name={tags[tagId].name}
              color={colorManager.toName(tags[tagId].color)}
              onDelete={onTagDelete}
            />
          ))}
        </ul>
        <footer>
          <QuickAddForm
            placeholder="새로운 태그 추가하기 (최대 15자)"
            onSubmit={onSubmit}
            styleName="tagModal"
            validator={validator}
          />
        </footer>
        <div className={styles.buttonWrapper}>
          <IconButton Icon={AiOutlineClose} styleName="close" onClick={closeModal} />
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
