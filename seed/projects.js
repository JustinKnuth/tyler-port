const db = require('../db/connection')
const Project = require('../models/project')
const faker = require('faker')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

    // create an array of 100 objects
    // use faker package to generate fake data
    const projects = [...Array(100)].map(item => {
        return {
            title: faker.lorem.sentence(),
            image_url: faker.internet.url(),
            description: faker.lorem.paragraph()
           
        }
    })
    await Project.insertMany(projects)
    console.log('Created projects!')
}

const run = async () => {
    await main()
    db.close()
}

run()