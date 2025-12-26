// src/modules/admin/carregarFirestore.js
export async function carregarFirestore() {
  const [{ doc, setDoc, collection }, { getFirebaseDB }] = await Promise.all([
    import("firebase/firestore"),
    import("../../firebase/config.js"),
  ]);

  const db = await getFirebaseDB();

  return { doc, setDoc, collection, db };
}
