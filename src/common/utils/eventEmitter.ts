import eventEmitter from '@services/eventEmitter';
import { EventNames, ModalNames } from '@common/constants/enums';

export const openModal = (
  name: ModalNames,
  props?: unknown,
  onClose?: () => void,
) =>
  eventEmitter.emit(EventNames.openModal, {
    name,
    props,
    onClose,
  });

export const closeModal = () => eventEmitter.emit(EventNames.hideModal);
