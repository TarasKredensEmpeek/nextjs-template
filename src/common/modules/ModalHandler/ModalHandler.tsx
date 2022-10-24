import React, { useCallback, useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';

import { EventNames, ModalNames } from '@common/constants/enums';
import useEventEmitter from '@common/hooks/useEventEmitter';

interface ModalParams {
  name?: ModalNames;
  props?: object;
  onClose?: () => void;
}

const ModalHandler = () => {
  const [modal, setModal] = useState<ModalParams | null>(null);

  const isModalOpened = useMemo(() => Boolean(modal?.name), [modal?.name]);

  const handleOpenModal = useCallback(
    (eventName: string, modalData: ModalParams) => {
      setModal(modalData);
    },
    [],
  );

  const handleHideModal = useCallback(() => {
    setModal(null);
  }, []);

  const { emit: emitHideModal } = useEventEmitter(
    EventNames.hideModal,
    handleHideModal,
  );

  const onClose = useCallback(() => {
    if (modal?.onClose) {
      modal.onClose();
    }

    emitHideModal();
  }, [modal, emitHideModal]);

  useEventEmitter(EventNames.openModal, handleOpenModal);

  return (
    <Dialog open={isModalOpened} onClose={onClose}>
      {modal?.name &&
        {
          [ModalNames.auth]: null,
          [ModalNames.confirmation]: null,
        }[modal?.name]}
    </Dialog>
  );
};

export default ModalHandler;
