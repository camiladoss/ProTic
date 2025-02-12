import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasProductos from './views/productos/rutas.js';
import rutasVenta from './views/ventas/rutas.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

dotenv.config({path: './.env'});

const app = Express();

app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-1k7j1s3x.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autentificacion-protic',
  issuer: 'https://dev-1k7j1s3x.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);
app.use(rutasUsuario);
app.use(rutasProductos);
app.use(rutasVenta);



app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`escuchando puerto ${process.env.PORT}`);
    });
};

conectarBD(main);
