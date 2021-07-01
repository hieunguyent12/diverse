import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function ModalComponent({
  isOpen,
  onClose,
  title,
  renderBody,
  renderFooter,
  ...props
}) {
  const {
    isOpen: _isOpen,
    onOpen: _onOpen,
    onClose: _onClose,
  } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen ?? _isOpen}
        onClose={onClose ?? _onClose}
        scrollBehavior="inside"
        {...props}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderBody()}</ModalBody>
          <ModalFooter>{renderFooter()}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
