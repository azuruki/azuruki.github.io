require('dotenv').config(); // Cargar las variables de entorno desde .env
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { spawn } = require('child_process');

const app = express();

app.use(cors());
app.use(express.json());

const AUTH_USERNAME = process.env.AUTH_USERNAME || "admin";
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "password";

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
// Endpoint para recibir y guardar los comentarios
app.post("/comment", upload.single('image'), (req, res) => {
    const text = req.body.text;
    const image = req.file ? req.file.filename : null;

    const pythonProcess = spawn('python', ['database.py', 'insert_comment', text, image]);
         let output = '';
        pythonProcess.stdout.on('data', (data) => {
              output += data.toString();
        });

       pythonProcess.stderr.on('data', (data) => {
             console.error(`stderr: ${data}`);
         });

         pythonProcess.on('close', (code) => {
           if (code === 0) {
              console.log(`Python script executed successfully`);
                  res.send({text, image});
           } else {
                 console.error(`Python script failed with code ${code}`);
            res.status(500).send({ message: 'Error al añadir comentario' });
         }
        });
});

app.get("/comment", (req, res) => {
      const pythonProcess = spawn('python', ['database.py', 'get_all_comments']);
       let output = '';
       let errorOutput = '';
        pythonProcess.stdout.on('data', (data) => {
              output += data.toString();
        });

      pythonProcess.stderr.on('data', (data) => {
               errorOutput += data.toString();
             });
         pythonProcess.on('close', (code) => {
            if(code === 0)
            {
               try{
                const comments = output.split("), (").map((row) => {
                  const [text, image] = row.replace('[(','').replace(')]','').split("', '").map(v=> v.replace("'", '').trim());
                   return {text, image};
                 })
               res.send(comments);
                }catch(e)
               {
                 console.error(errorOutput);
                   return res.status(500).send({message:'Error al leer comentarios'})
                }
            } else
            {
              console.error(errorOutput);
              return res.status(500).send({message: 'Error al obtener comentarios'});
           }

        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});