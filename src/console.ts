import { BootstrapConsole } from 'nestjs-console';
import { ConsoleModule } from './cli/console.module';

const bootstrap = new BootstrapConsole({
  module: ConsoleModule,
  useDecorators: true,
});

void bootstrap.init().then(async (app) => {
  try {
    await app.init();
    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
    await bootstrap.boot();
    await app.close();
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
