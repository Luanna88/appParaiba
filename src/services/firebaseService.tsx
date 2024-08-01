import { firestore, auth } from '../../firebase.config';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from 'firebase/firestore/lite';


const firebaseService = {
  findAll: async (collectionName: string) => {
    try {
      const col = collection(firestore, collectionName);
      const snapshot = await getDocs(col);
      const docList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return docList;
    } catch (error) {
      console.error('Error finding all documents:', error);
      throw error;
    }
  },

  saveStamp: async (stampData: any) => {
    try {
      const docRef = await addDoc(collection(firestore, 'ConfirmVisitInfo'), stampData);
      return docRef.id;
    } catch (error) {
      console.error('Error saving stamp:', error);
      throw error;
    }
  },

  save: async (data: any, collectionName: string, docId: string = '') => {
    try {
      if (docId) {
        const docRef = doc(firestore, collectionName, docId);
        await updateDoc(docRef, data);
        return { id: docRef.id };
      } else {
        const docRef = await addDoc(collection(firestore, collectionName), data);
        return { id: docRef.id };
      }
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  },

  delete: async (docId: string, collectionName: string) => {
    const docRef = doc(firestore, collectionName, docId);
    await deleteDoc(docRef);
  },
  
  findOne: async (collectionName: string, docId: string) => {
    try {
      const docRef = doc(firestore, collectionName, docId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      } else {
        throw new Error('Documento não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
      throw error;
    }
  },
};

export default firebaseService;
