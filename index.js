const http = require('http');
const app = express();
app.use(express.json());
// Datos para simular la base de datos en memoria
const alumnos = [];
const profesores = [];

// Validación de datos
function validarAlumno(alumno) {
    return alumno && typeof alumno.id === 'number' &&
        typeof alumno.nombres === 'string' &&
        typeof alumno.apellidos === 'string' &&
        typeof alumno.matricula === 'number' &&
        typeof alumno.promedio === 'number';
}

function validarProfesor(profesor) {
    return profesor && typeof profesor.id === 'number' &&
        typeof profesor.numeroEmpleado === 'string' &&
        typeof profesor.nombres === 'string' &&
        typeof profesor.apellidos === 'string' &&
        typeof profesor.horasClase === 'number';
}

// Función para manejar las solicitudes HTTP
function requestHandler(req, res) {
    const { method, url } = req;

    // Rutas para alumnos
    if (url === '/alumnos' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(alumnos));
    } else if (url.startsWith('/alumnos/') && method === 'GET') {
        const id = parseInt(url.split('/')[2]);
        const alumno = alumnos.find(a => a.id === id);
        if (alumno) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(alumno));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Alumno no encontrado" }));
        }
    } else if (url === '/alumnos' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const nuevoAlumno = JSON.parse(body);
                if (validarAlumno(nuevoAlumno)) {
                    alumnos.push(nuevoAlumno);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(nuevoAlumno));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Datos de alumno inválidos" }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Error interno del servidor" }));
            }
        });
    } else if (url.startsWith('/alumnos/') && method === 'PUT') {
        const id = parseInt(url.split('/')[2]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const alumnoActualizado = JSON.parse(body);
                if (validarAlumno(alumnoActualizado)) {
                    const index = alumnos.findIndex(a => a.id === id);
                    if (index !== -1) {
                        alumnos[index] = alumnoActualizado;
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(alumnoActualizado));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "Alumno no encontrado" }));
                    }
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Datos de alumno inválidos" }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Error interno del servidor" }));
            }
        });
    } else if (url.startsWith('/alumnos/') && method === 'DELETE') {
        const id = parseInt(url.split('/')[2]);
        const index = alumnos.findIndex(a => a.id === id);
        if (index !== -1) {
            const eliminado = alumnos.splice(index, 1)[0];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(eliminado));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Alumno no encontrado" }));
        }
    }

    // Rutas para profesores
    else if (url === '/profesores' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(profesores));
    } else if (url.startsWith('/profesores/') && method === 'GET') {
        const id = parseInt(url.split('/')[2]);
        const profesor = profesores.find(p => p.id === id);
        if (profesor) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(profesor));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Profesor no encontrado" }));
        }
    } else if (url === '/profesores' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const nuevoProfesor = JSON.parse(body);
                if (validarProfesor(nuevoProfesor)) {
                    profesores.push(nuevoProfesor);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(nuevoProfesor));
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Datos de profesor inválidos" }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Error interno del servidor" }));
            }
        });
    } else if (url.startsWith('/profesores/') && method === 'PUT') {
        const id = parseInt(url.split('/')[2]);
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const profesorActualizado = JSON.parse(body);
                if (validarProfesor(profesorActualizado)) {
                    const index = profesores.findIndex(p => p.id === id);
                    if (index !== -1) {
                        profesores[index] = profesorActualizado;
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(profesorActualizado));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "Profesor no encontrado" }));
                    }
                } else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Datos de profesor inválidos" }));
                }
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Error interno del servidor" }));
            }
        });
    } else if (url.startsWith('/profesores/') && method === 'DELETE') {
        const id = parseInt(url.split('/')[2]);
        const index = profesores.findIndex(p => p.id === id);
        if (index !== -1) {
            const eliminado = profesores.splice(index, 1)[0];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(eliminado));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Profesor no encontrado" }));
        }
    }

    // Ruta no encontrada
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Ruta no encontrada" }));
    }
}

// Configuración del servidor HTTP
const httpServer = http.createServer(requestHandler);
httpServer.listen(3000, () => {
    console.log('Servidor HTTP en ejecución en http://localhost:3000');
});
