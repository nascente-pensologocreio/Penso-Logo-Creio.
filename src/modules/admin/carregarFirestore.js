// src/modules/admin/carregarFirestore.js
export async function carregarFirestore() {
  const [{ doc, setDoc, collection }, { db }] = await Promise.all([
    import("firebase/firestore"),
    import("../../firebase/config")
  ]);

  return { doc, setDoc, collection, db };
}
