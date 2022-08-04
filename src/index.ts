import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const app = express();
const port = 8080; // default port to listen

app.use(express.json());

// define a route handler for the default home page
app.get( '/', ( req, res ) => {
    res.send( 'Hello world!' );
} );

app.post('/api/embeddedController/create', async (req, res) => {
    const {name, location} = req.body;
    try {

        const result = await prisma.embeddedController.create({
            data: {
                name: name,
                location: location,
            }
        })
        
        res.json(result);
    } catch (e) {
        console.log(e);
    }
});

app.get('/api/embeddedControllers', async (req, res) => {
    try {
        const embeddedControllers = await prisma.embeddedController.findMany();
        res.json(embeddedControllers);
    } catch(e) {
        console.log(e);
    }
});

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );