import express from 'express';
import ejs from 'ejs';
import path from 'path';
import routes from './routes/primary.routes';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = process.argv[2] || 8080;

const server = app.listen(port, function() {
  console.log(`Listening to port ${server.address().port}`);
});

// Mount primary routes 
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

app.use('/', routes);

// Export for testing 
export default server;