import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native';
import ZoomableImage from '../ZoomableImage'
import colors from '../../assets/const/colors';
import BackButton from '../../components/BackButton'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ConfirmModal from './ConfirModal';

import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../credentials'
import { showErrorToast, showSuccessToast } from '../../utils/toast';


export default function CardView() {

  const navigation = useNavigation();

  const route = useRoute();
  const [show, setShow] = useState(false);
  const { item } = route.params;
  const formattedDate = new Date(item.fecha).toISOString().slice(0, 10);


  const handleUpdate = () => {
    navigation.navigate("CardModal", { uri: null, item: item })
  }

  const handleDelete = () => {
    setShow(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "cards", item.id));
      showSuccessToast("Carta eliminada", "Carta eliminada con exito")
      setShow(false);
      navigation.navigate("Gallery")
    } catch (error) {
      console.error("Error eliminando carta:", error);
      showErrorToast("Error", "No se pudo eliminar la carta")
    }
    setShow(false);
  };

  return (
    <>
      <View>
        <BackButton />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#BDB7EA', '#E6E6FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={styles.card}>

            <Animated.View entering={FadeInUp.duration(400).delay(500)} style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.modelo}</Text>
            </Animated.View>

            <ZoomableImage uri={item.imagenPath} />

            <Animated.View entering={FadeInUp.duration(400).delay(500)} style={styles.cardBody}>
              <InfoRow label="Tipo:" value={item.tipo} />
              <InfoRow label="Fecha:" value={formattedDate} />
              <InfoRow label="Matrícula:" value={item.matricula} />

              <View style={styles.descriptionBox}>
                <Text style={styles.labelText}>Descripción</Text>
                <Text style={styles.text}>{item.descripcion}</Text>
              </View>

              <View style={{ marginBlock: 10 }}>
                <ActionButton label="Ver detalles del avion" onPress={null} backgroundColor='#4285F4' />
                <ActionButton label="Actualizar carta" onPress={handleUpdate} backgroundColor='#4285F4' />
                <ActionButton label="Eliminar carta" onPress={handleDelete} backgroundColor='#DB4437' />
              </View>
            </Animated.View>

          </View>
        </LinearGradient>
      </ScrollView>

      <ConfirmModal
        isVisible={show}
        onCancel={() => setShow(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

const ActionButton = ({ label, onPress, backgroundColor, textColor = 'white' }) => (
  <TouchableOpacity onPress={onPress} style={[styles.actionButton, { backgroundColor }]}>
    <Text style={[styles.actionButtonText, { color: textColor }]}>{label}</Text>
  </TouchableOpacity>
);

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={styles.text}>{value}</Text>
  </View>
);


const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 22,
    marginTop: 80,
    marginHorizontal: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#4285F4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20, // para Android
  },
  card: {
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    paddingBottom: 20,
    flex: 1,
    alignItems: 'center',
  },
  cardHeader: {
    backgroundColor: '#16213E',
    flexDirection: 'row',
    width: '100%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4285F4',
  },

  cardTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    flex: 1, // para que ocupe todo el espacio restante
  },
  cardBody: {
    width: '90%',
    marginTop: 16,
    gap: 14,
  },
  infoRow: {
    backgroundColor: '#0F3460',
    padding: 10,
    borderRadius: 10,
  },
  labelText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 4,
  },
  text: {
    color: '#4FC3F7',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionBox: {
    marginTop: 16,
    backgroundColor: '#1F4068',
    padding: 10,
    borderRadius: 12,
  },
  actionButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

