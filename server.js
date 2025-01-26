const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const originalExtension = path.extname(file.originalname);
        const newFilename = uniqueSuffix + originalExtension;
        cb(null, newFilename.replace(/-/g, '_'));
    },
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

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

// Nuevo endpoint GET para /uploads
app.get("/uploads", (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error("Error al leer el directorio uploads:", err);
            return res.status(500).send("Error al leer el directorio uploads");
        }
      
        const images = files.map(file => ({
            url: `/uploads/${file}`,
            name: file
        }));
        res.send(images);
    });
  });
app.get("/pages/foro.html", (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'pages', 'foro.html'))
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});