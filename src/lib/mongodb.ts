import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // En desarrollo, usamos una variable global para preservar la conexión entre recargas de HMR
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // En producción, es mejor no usar una variable global
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

// Función auxiliar para conectar a la base de datos
export async function connectToDatabase() {
  const client = await clientPromise
  const db = client.db("shopnow") // Nombre de la base de datos
  return { client, db }
}

export default clientPromise

