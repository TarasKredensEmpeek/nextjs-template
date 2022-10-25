import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { useRouter } from 'next/router';

import { EventNames, ModalNames } from '@common/constants/enums';
import useEventEmitter from '@common/hooks/useEventEmitter';

import Auth from '../Auth';

interface ModalParams {
  name?: ModalNames;
  props?: object;
  onClose?: () => void;
  maxWidth?: DialogProps['maxWidth'];
}

const ModalHandler = () => {
  const router = useRouter();
  const [modal, setModal] = useState<ModalParams | null>(null);

  const isModalOpened = useMemo(() => Boolean(modal?.name), [modal?.name]);
  const maxWidth = useMemo(() => modal?.maxWidth || 'md', [modal?.maxWidth]);

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

  const closeAnyModalOnChangeLocation = useCallback(() => {
    const handleRouteChange = () => {
      if (!isModalOpened) {
        return;
      }

      emitHideModal();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
  }, [isModalOpened, emitHideModal, router.events]);

  useEventEmitter(EventNames.openModal, handleOpenModal);

  useEffect(
    () => closeAnyModalOnChangeLocation(),
    [closeAnyModalOnChangeLocation],
  );

  return (
    <Dialog open={isModalOpened} onClose={onClose} maxWidth={maxWidth}>
      {modal?.name &&
        {
          [ModalNames.auth]: <Auth {...modal.props} onClose={onClose} />,
          [ModalNames.confirmation]: null,
        }[modal?.name]}
    </Dialog>
  );
};

export default ModalHandler;
