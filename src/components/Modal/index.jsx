import { styles } from "./styles";
import { Modal, Pressable } from "react-native";

const CustomModal = ({
  children,
  hideModal = () => {},
  showModal = () => {},
  visibility = false,
  contentContainerStyle = {},
  backdrop = true,
}) => {
  return (
    <Modal visible={visibility} transparent onRequestClose={hideModal}>
      <Pressable
        style={[
          styles.modalContentDefaultStyle,
          contentContainerStyle,
          backdrop && { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        ]}
        onPress={hideModal}
      >
        {children}
      </Pressable>
    </Modal>
  );
};
export default CustomModal;
