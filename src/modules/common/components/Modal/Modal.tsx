import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { css } from 'stitches.config';

const ModalOverlay = css({
  position: 'fixed',
  inset: 0,
  backgroundColor: '#0b0b0b85'
});

const ModalContainer = css({
  position: 'absolute',
  inset: '10% 20%',
  border: '1px solid #18192a',
  overflow: 'auto',
  borderRadius: '$3',
  outline: 'none',
  padding: '$4',
  backgroundColor: '$white',
  display: 'flex',
  flexDirection: 'column'
});

interface Props {
  label: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

ReactModal.setAppElement('#root');

export const Modal = ({ label, isOpen, onClose, children }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className={ModalContainer.className}
      overlayClassName={ModalOverlay.className}
      onRequestClose={onClose}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
      contentLabel={label}
    >
      {children}
    </ReactModal>
  );
};
