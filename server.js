const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Configuración de Multer para guardar las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único
  },
});
const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos
app.use(express.static("public")); // Carpeta pública (para HTML, CSS, JS)

// Ruta para subir imágenes
app.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;
  const title = req.body.title;

  if (!file) {
    return res.status(400).send("No se subió ningún archivo.");
  }

  res.send({
    message: "¡Imagen subida con éxito!",
    file: file.filename,
    title: title,
  });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


app.get("/images", (req, res) => {
    const fs = require("fs");
    const files = fs.readdirSync("uploads/");
    const images = files.map((file) => ({
      url: `/uploads/${file}`,
      name: file,
    }));
  
    res.send(images);
  });
  