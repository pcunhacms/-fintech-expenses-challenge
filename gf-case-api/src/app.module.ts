import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { TransactionsModule } from './transactions/transactions.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        const shouldUseSsl =
          Boolean(databaseUrl) ||
          configService.get<string>('DB_SSL') === 'true' ||
          configService.get<string>('DATABASE_URL')?.includes('sslmode=require') ||
          isProduction;

        return {
          type: 'postgres' as const,
          ...(databaseUrl
            ? { url: databaseUrl }
            : {
                host: configService.get<string>('DB_HOST'),
                port: Number(configService.get<string>('DB_PORT') || 5432),
                username: configService.get<string>('DB_USER'),
                password: configService.get<string>('DB_PASS'),
                database: configService.get<string>('DB_NAME'),
              }),
          ssl: shouldUseSsl ? { rejectUnauthorized: false } : false,
          autoLoadEntities: true,
          synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
        };
      },
    }),

    AuthModule,
    UsersModule,
    CategoriesModule,
    TransactionsModule,
    DashboardModule,
  ],
})
export class AppModule {}