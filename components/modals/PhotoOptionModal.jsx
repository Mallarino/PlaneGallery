import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';


export default function PhotoOptionModal({ visible, onClose, onCameraPress, onGalleryPress }) {
    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onCameraPress}>
                        <Text style={styles.option}>📷 Cámara</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onGalleryPress}>
                        <Text style={styles.option}>🖼️ Galería</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.cancel}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  option: {
    fontSize: 18,
    paddingVertical: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cancel: {
    fontSize: 18,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#FF3B30',
    marginTop: 10,
  },

});