import config from 'config';
import app from './app' ;
import DB_Connection from './repositories/db';

let port = config.get('port');

if(config.util.getEnv('NODE_ENV') === 'production') {
    port = process.env.PORT;
}

if(!port) {
    process.exit(1);
}

const PORT: number = parseInt(port as string, 10);

const db_connection = new DB_Connection();
db_connection.connect_db();

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

type ModuleId = string | number;
interface WebpackHotModule {
  hot?: {
    data: any;
    accept(dependencies: string[], callback?: (updatedDependencies: ModuleId[]) => void): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}
declare const module: WebpackHotModule;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}