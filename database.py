import sqlite3

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('database.db')
        print("Conexión a la base de datos exitosa")
        return conn
    except sqlite3.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

def create_tables():
  conn = create_connection()
  if conn:
        try:
            conn.execute('''
              CREATE TABLE IF NOT EXISTS comments(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                image TEXT
                );
              ''')
            conn.commit()
            print("Tabla comentarios creada")
            conn.close()
        except sqlite3.Error as e:
             print(f"Error al crear la tabla: {e}")

def insert_comment(text, image=None):
  conn = create_connection()
  if conn:
        try:
          cursor = conn.cursor()
          cursor.execute("INSERT INTO comments (text, image) VALUES (?,?)", (text, image))
          conn.commit()
          print("comentario insertado")
          conn.close()
          return  cursor.lastrowid

        except sqlite3.Error as e:
          print(f"Error al insertar comentario: {e}")
          conn.close()
          return None

def get_all_comments():
   conn = create_connection()
   if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT text, image FROM comments;")
            rows = cursor.fetchall()
            print("comentarios leidos")
            conn.close()
            return rows

        except sqlite3.Error as e:
           print(f"Error al obtener los comentarios: {e}")
           conn.close()
           return None

if __name__ == '__main__':
    create_tables()