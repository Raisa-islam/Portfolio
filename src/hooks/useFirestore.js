import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

export function useCollection(collectionName, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const constraints = [];

        if (options.orderByField) {
          constraints.push(orderBy(options.orderByField, options.orderDirection || 'desc'));
        }
        if (options.whereField) {
          constraints.push(where(options.whereField, options.whereOp || '==', options.whereValue));
        }

        const q = query(collection(db, collectionName), ...constraints);
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setData(docs);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, options.orderByField, options.whereField, options.whereValue]);

  const refetch = async () => {
    setLoading(true);
    try {
      const constraints = [];
      if (options.orderByField) {
        constraints.push(orderBy(options.orderByField, options.orderDirection || 'desc'));
      }
      if (options.whereField) {
        constraints.push(where(options.whereField, options.whereOp || '==', options.whereValue));
      }
      const q = query(collection(db, collectionName), ...constraints);
      const snapshot = await getDocs(q);
      setData(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

export async function addDocument(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateDocument(collectionName, id, data) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(collectionName, id) {
  await deleteDoc(doc(db, collectionName, id));
}

export async function getDocument(collectionName, id) {
  const docSnap = await getDoc(doc(db, collectionName, id));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}
