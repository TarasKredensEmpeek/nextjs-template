import { DialogProps } from '@mui/material/Dialog';

import eventEmitter from '@services/eventEmitter';
import { EventNames, ModalNames } from '@common/constants/enums';

export const openModal = (
  name: ModalNames,
  props?: unknown,
  onClose?: () => void,
  maxWidth: DialogProps['maxWidth'] = 'md',
) =>
  eventEmitter.emit(EventNames.openModal, {
    name,
    props,
    onClose,
    maxWidth,
  });

export const closeModal = () => eventEmitter.emit(EventNames.hideModal);
