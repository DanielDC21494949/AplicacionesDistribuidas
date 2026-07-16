const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);


// Importa la librería de MongoDB y obtiene la clase MongoClient para conectarse a la base de datos
const MongoClient = require('mongodb').MongoClient;  

// Importa el módulo assert de Node.js (se usa normalmente para verificar condiciones en pruebas)
const assert = require('assert'); 

// Función que imprime un documento recibido en formato JSON con indentación
function iterateFunc(doc) {  
   console.log(JSON.stringify(doc, null, 4));
}

// Función asincrónica para listar todas las bases de datos del servidor MongoDB
async function listDatabases(client) {  

  // Solicita al servidor la lista de bases de datos usando privilegios de administrador
  databasesList = await client.db().admin().listDatabases(); 

  // Imprime un encabezado en la consola
  console.log("Databases:");

  // Recorre cada base de datos encontrada e imprime su nombre
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// Función asincrónica para consultar datos de la colección movies
async function findAllData(client) {

  // Realiza una consulta a la base de datos sample_mflix, colección movies
  // find({}) significa traer todos los documentos
  // limit(2) limita el resultado a 2 documentos
  const cursor = await client.db("sample_mflix").collection("movies").find({}).limit(2);

  // Convierte el cursor (resultado de la consulta) en un arreglo de documentos
  const results = await cursor.toArray();

  // Imprime el título de la primera película encontrada
  console.log("Title: ",results[0]['title']); 

  // Muestra un encabezado
  console.log("Películas encontradas:");

  // Imprime los documentos encontrados en formato JSON con indentación
  console.log(JSON.stringify(results, null, 2));
  
}

// Función asincrónica para obtener 5 documentos de la colección comments
async function findComments(client) {

  // Realiza una consulta a la base de datos sample_mflix
  // colección comments, sin filtros
  // limit(5) devuelve solo 5 documentos
  const cursor = await client
    .db("sample_mflix").collection("comments").find({}).limit(5);

  // Convierte los resultados del cursor a un arreglo
  const results = await cursor.toArray();

  // Imprime un encabezado
  console.log("\nComentarios encontrados:");

  // Imprime los comentarios encontrados en formato JSON
  console.log(JSON.stringify(results, null, 2));
}

// Función asincrónica para obtener 5 documentos de la colección embedded_movies
async function findEmbeddedMovies(client) {

  // Consulta la base de datos sample_mflix
  // en la colección embedded_movies
  // find({}) busca todos los documentos
  // limit(5) limita la salida a 5 resultados
  const cursor = await client
    .db("sample_mflix")
    .collection("embedded_movies")
    .find({})
    .limit(5);

  // Convierte el cursor a un arreglo de documentos
  const results = await cursor.toArray();

  // Imprime un encabezado
  console.log("\nPelículas (embedded_movies):");

  // Imprime los documentos encontrados en formato JSON
  console.log(JSON.stringify(results, null, 2));
}


// Función principal del programa
async function main() {

  // URI de conexión al clúster de MongoDB Atlas
const uri = "mongodb+srv://DanielG:DanielG@cluster0.kyxjy2h.mongodb.net/?appName=Cluster0";
// Crea una instancia del cliente MongoDB usando la URI
const client = new MongoClient(uri);

  try {

    // Conecta la aplicación con el clúster de MongoDB
    await client.connect();

    // Ejecuta las funciones definidas anteriormente
    //await listDatabases(client);       lista las bases de datos
    //await findAllData(client);         consulta 2 películas
    await findComments(client);       // consulta 5 comentarios
    await findEmbeddedMovies(client); // consulta 5 películas embedded

  } catch (e) {

    // Si ocurre un error durante la ejecución lo muestra en consola
    console.error(e);

  } finally {

    // Cierra la conexión con la base de datos al finalizar
    await client.close();
  }
}

// Ejecuta la función principal y captura errores si ocurren
main().catch(console.error);