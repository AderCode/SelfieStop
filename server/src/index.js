import { join } from 'path';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import stateRouting from './middleware/routing.mw';
import configurePassport from './config/passport';
import bodyParser from 'body-parser';






let app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

configurePassport(app);

app.use('/api', routes);

app.use(stateRouting);

let port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
