require('dotenv').config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const AUTH_USERNAME = process.env.AUTH_USERNAME || "admin";
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "password";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
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

// Endpoint de login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
        res.send({ message: "Autenticación exitosa", success: true });
    } else {
        res.status(401).send({ message: "Credenciales incorrectas", success: false });
    }
});

// Endpoint de subida de imágenes
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

// Endpoint para obtener las imágenes subidas
app.get("/uploads", (req, res) => {
    const uploadsDir = path.join(__dirname, 'public', 'uploads');
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

// Endpoint para servir la página foro.html
app.get("/pages/foro.html", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'foro.html'))
});

app.post("/comment", upload.single('image'), (req, res) => {
    const text = req.body.text;
    const image = req.file ? req.file.filename : null;
     const commentsFile = "comments.json"
    fs.readFile(commentsFile, 'utf8', (err, data) => {
    let comments = [];
     if(!err && data)
        {
            try {
                 comments = JSON.parse(data);
            } catch (error) {
               comments = [];
            }
        }
         const newComment = {text, image: image ? `/uploads/${image}` : null}
        comments.push(newComment);

            fs.writeFile(commentsFile, JSON.stringify(comments, null, 2), (err) => {
              if (err) {
                 console.error('Error writing to file: ', err);
                return res.status(500).send({ message: 'Error al añadir comentario' });
                }
                res.send(newComment)
          });
    });
});

app.get("/comment", (req, res) => {
  const commentsFile = "comments.json"
    fs.readFile(commentsFile, 'utf8', (err, data) => {
        if (err) {
            console.error("Error al leer el archivo comments.json:", err);
            return res.status(500).send("Error al leer el archivo de comentarios");
        }
       try{
            const comments = JSON.parse(data);
             res.send(comments);
        } catch(e){
          res.status(500).send({message:"Error al parsear los comentarios"})
        }
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});