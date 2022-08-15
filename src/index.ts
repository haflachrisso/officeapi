import express from 'express';
import cors from 'cors';
import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const app = express();
const port = 8080; // default port to listen
app.use(cors());
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
                name,
                location,
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

app.get('/api/embeddedController/:id', async (req, res) => {

    const {id} = req.params;

    try {
        const embeddedController = await prisma.embeddedController.findUnique({
            where: {
              id: Number(id),
            },
            include: {
                humMeasurements: {
                    take: -50,
                },
                tempMeasurements: {
                    take: -50,
                }
            }
        });
        res.json(embeddedController);
    } catch(e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});

app.post('/api/tempMeasurement', async (req, res) => {
    // tslint:disable-next-line:no-console
    console.log(req.body);
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

app.get('/api/tempMeasurements/:number?', async (req, res) => {

    const numberParamParam = req.params.number;

    const numberOfMeasurements = typeof numberParam !== 'undefined' ? Number(numberParam) : undefined;


    try {
        const tempMeasurements = await prisma.tempMeasurements.findMany({
            take: -numberOfMeasurements
        });
        res.json(tempMeasurements);
    } catch(e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});

app.post('/api/humMeasurement', async (req, res) => {
    const {humPercent, controllerId} = req.body;

    try {
        const result = await prisma.humMeasurements.create({
            data: {
                humPercent,
                controllerId,
            }
        })
        res.json(result);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
    }
});

app.get('/api/humMeasurements/:number?/:number?', async (req, res) => {
    const numberParam = req.params.number;

    const numberOfMeasurements = typeof numberParam !== 'undefined' ? Number(numberParam) : undefined;

    const numberParam = req.params.number;

    const numberOfMeasurements = typeof numberParam !== 'undefined' ? Number(numberParam) : undefined;

    try {
        const humMeasurements = await prisma.humMeasurements.findMany({
            take: -numberOfMeasurements
        });
        res.json(humMeasurements);
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