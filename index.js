const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const puerto = 3000;

app.use(express.json());
app.use(cors());

//Get donde pueda devolver todos los datos

app.get('/user', async (req, res) => {
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
        res.json(respuesta.data);
    } catch (error) {
        console.error("Error al obtener los usuarios", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//Obtener usuario por id y mostrar solo su nombre

app.get('/user/:id', async (req, res) => {

    try {
        const id = req.params.id;
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const usuario = respuesta.data;

    const dataMapeada = {
        name: usuario.title
    }

    res.json(dataMapeada);
    } catch (error) {
        console.error("User no encontrado", error.message);
        res.status(500).json({error: "Error interno del servidor"})
    }
    
})

//GET donde se pueda consultar por el title y devuelva todos los campos.

app.get('/user/title/:title', async (req, res) => {
    const { title } = req.params;
    try {
        // Obtener todas las tareas
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const todos = response.data;

        // Filtrar las tareas que coinciden con el título especificado
        const filteredTodos = todos.filter(todo => todo.title.toLowerCase() === title.toLowerCase());

        if (filteredTodos.length === 0) {
            return res.status(404).json({ error: "No se encontró ningún todo con ese título" });
        }

        res.json(filteredTodos);
    } catch (error) {
        console.error("No se encontró el título", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//Obtener solamente 5 docs

app.get('/limit', async (req, res) => {
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
        const data = respuesta.data;
        res.json(data);
    } catch (error) {
        console.error("Error al tratar de obtener los 5 docs");
        res.status(500).json({error: "Error interno en el servidor"});
    }
});


// app.post('/user', async (req, res) => {
//     try {
//         const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', req.body);
//         res.status(201).json(data);
//     } catch (error) {
//         console.error("Error al crear el usuario:", error.message);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     }
// });

// app.put('/user/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, req.body);
//         res.json(data);
//     } catch (error) {
//         console.error(`Error al actualizar el usuario con ID ${id}:`, error.message);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// });

// app.delete('/user/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
//         res.sendStatus(204);
//     } catch (error) {
//         console.error(`Error al borrar el usuario con ID ${id}:`, error.message);
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// });

app.listen(puerto, () => {
    console.log(`Servidor API en ejecución en http://localhost:${puerto}`);
});
