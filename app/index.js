import ejs from 'ejs'
import express from 'express'
import { fileURLToPath } from 'url'
import indexRouter from './routes/index.js'
import path from 'path'

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuración de vistas: lee los archivos .ejs de la carpeta views
app.set('views', path.join(__dirname, '..', 'views'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.get('/vistas/:viewName', (req, res) => {
  const viewName = req.params.viewName
  res.render(viewName, { title: viewName }, (err, html) => {
    if (err) {
      console.log(err)
      res.status(404).send('Página no encontrada')
    } else {
      res.send(html)
    }
  })
})

// Middleware para parsear el body de las peticiones: permite poder recibir datos en formato JSON
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Middleware para servir archivos estáticos: permite servir archivos estáticos como imágenes, CSS, JS, etc.
app.use(express.static(path.join(__dirname, '..', 'public')))

//Configuracion de rutas
app.use('/', indexRouter)

// Inicialización del servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})