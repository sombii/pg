const express = require("express")
const {pool} = require("./db")

const app = express();

const PORT = 5500

app.use(express.json())

//routes
//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT description FROM todo");
        res.json(allTodos.rows)
    } catch (e) {
        console.log(e)
    }
})

//get a todos
app.get("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
        res.json(todo.rows[0])
    } catch (e) {
        console.log(e)
    }
})

//create a todos
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
        res.json(newTodo.rows[0])
    } catch (e) {
        console.log(e)
    }
})

//update a todos
app.put("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        const {description} = req.body
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2 RETURNING *", [description,id])
        res.json(updateTodo.rows[0])
    } catch (e) {
        console.log(e)
    }
})

//del a todos
app.delete("/todos/:id", async (req, res) => {
    const {id} = req.params
    try {
        await pool.query("DELETE FROM todo WHERE id = $1", [id])
        res.json({message: "delete success."})
    } catch (e) {
        console.log(e)
    }
})

app.listen(PORT, () => {
    console.log("server is listening on port:", PORT)
})