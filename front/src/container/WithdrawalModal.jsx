import React from 'react';
import Modal from './Modal';
import Button from '../components/Button';
import Input from '../components/Input';
import ModalHeader from '../components/ModalHeader';
import useInput from '../hooks/useInput';
import styles from '../styles/WithdrawalModal.module.css';

const WithdrawalModal = ({ closeModal, removeAccount, setAlert }) => {
  const { value, onChange, reset } = useInput();

  const onSubmit = () => {
    if (value === '동의합니다') {
      setAlert({
        display: true,
        message: '정말 계정을 삭제하시겠습니까?',
        cancel: '취소',
        confirm: '삭제',
        onConfirm: () => {
          if (removeAccount instanceof Function) removeAccount();
          closeModal();
        },
        onClose: () => reset(),
      });
    } else {
      setAlert({
        display: true,
        message: '사용자의 동의 없이 \n 계정을 삭제할 수 없습니다',
        cancel: '확인',
      });
    }
  };

  return (
    <Modal styleName="withdrawalModal" isBG onBGClick={closeModal}>
      <div className={styles.container}>
        <ModalHeader title="계정 삭제" closeModal={closeModal} />
        <div className={styles.body}>
          <p className={styles.announcement}>
            <span className={styles.warning}>
              계정을 삭제하면 <br />
              더 이상 WantoDo 서비스를 이용할 수 없으며 <br />
              삭제된 계정은 복구가 불가능 합니다. <br />
            </span>
            <br />
            그래도 계정 삭제를 진행하려면
            <br />
            다음 밑줄 표시된 칸을 채우고 삭제하기 버튼을 눌러주세요.
          </p>
          <p className={styles.agreement}>
            WantoDo에서 본 계정을 삭제하는 것에
            <Input
              styleName="withdrawal"
              value={value}
              onChange={onChange}
              placeholder="동의합니다"
            />
          </p>
        </div>
        <div className={styles.buttons}>
          <Button styleName="withdrawal_button" onClick={closeModal}>
            돌아가기
          </Button>
          <Button styleName="withdrawal_cancel_button" onClick={onSubmit}>
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawalModal;
