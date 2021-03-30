import 'dotenv/config';
import App from './app';
import UsersRoute from './routes/user.route';
import IndexRoute from './routes/index.route';
import AuthRoute from './routes/auth.route';

const app = new App([
  new UsersRoute(),
  new IndexRoute(),
  new AuthRoute(),
]);

app.listen();