import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegrafModule } from 'nestjs-telegraf';
import { MyBotName } from './app.constants';
import { AppService } from './app.service';
import { AppUpdate } from './app.update';
import { User } from './models/user.model';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: MyBotName,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [],
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forFeature([User]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORTE),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      models: [User],
      autoLoadModels: true,
      logging: false,
      dialectOptions: {
        ssl: {
          require: 'true',
        },
      },
    }),
  ],

  providers: [AppService, AppUpdate],
})
export class AppModule {}
