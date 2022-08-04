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

app.post('/create/embeddedController', async (req, res) => {
    const {name, location} = req.body;

    const result = await prisma.embeddedController.create({
        data: {
            name: name,
            location: location,
        }
    })

    res.json(result);
});
// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );