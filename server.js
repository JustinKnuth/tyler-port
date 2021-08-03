const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const PORT = process.env.PORT || 3000
const db = require('./db/connection')
const Project = require('./models/project')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`))

app.get('/', (req, res) => res.send("This is root!"))

app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find()
        res.json(projects)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params
        const project = await Project.findById(id)
        if (!project) throw Error('Post not found')
        res.json(project)
    } catch (e) {
        console.log(e)
        res.send('Post not found!')
    }
})

app.post('/project', async (req, res) => {
    try {
        const project = await new Project(req.body)
        await project.save()
        res.status(201).json(project)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

app.put('/projects/:id', async (req, res) => {
    const { id } = req.params
    await Project.findByIdAndUpdate(id, req.body, { new: true }, (error, project) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        if (!project) {
            return res.status(404).json({ message: 'Post not found!' })
        }
        res.status(200).json(project)
    })
})

app.delete('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Project.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Post deleted")
        }
        throw new Error("Post not found")
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})