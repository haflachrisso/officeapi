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
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});

app.get('/api/embeddedControllers', async (req, res) => {
    try {
        const embeddedControllers = await prisma.embeddedController.findMany();
        res.json(embeddedControllers);
    } catch(e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});

app.post('/api/tempMeasurement/create', async (req, res) => {
    const {tempCelcius, controllerId} = req.body;
    try {

        const result = await prisma.tempMeasurements.create({
            data: {
                tempCelcius,
                controllerId,
            }
        })
        
        res.json(result);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});

app.get('/api/tempMeasurements', async (req, res) => {
    try {
        const tempMeasurements = await prisma.tempMeasurements.findMany();
        res.json(tempMeasurements);
    } catch(e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );