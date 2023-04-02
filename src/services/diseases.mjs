import { getDocs, collection, doc, getDoc, query, where } from "firebase/firestore"; 
import { getDb } from "./db.mjs"

const collection_name = "Plant Disease"

export const findAll = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))

    const res = []

    doc_refs.forEach(item => {
        res.push({
            id: item.id, 
            ...item.data()
        })
    })

    return res
}

export const findOne = async id => {
    const d = await getDoc(doc(getDb(), collection_name, id)) 
    return d.data()
}