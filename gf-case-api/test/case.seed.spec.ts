import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';

import { AppModule } from '../src/app.module';

jest.setTimeout(30000);

describe('CASE SEED E2E - REAL DATA', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.DB_SYNCHRONIZE = 'true';

    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get<DataSource>(DataSource);
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    await dataSource.synchronize();
  });

  afterAll(async () => {
    await app.close();
  });

  it('seed completo com dados para visualizacao', async () => {
    const email = 'admin@case.com';
    const password = '123456';

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Admin Case',
        email,
        password,
      });
      

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password });

    expect(loginRes.status).toBe(201);

    const token = loginRes.body.access_token;

    const auth = {
      Authorization: `Bearer ${token}`,
    };

    const categories: Record<string, string> = {};

    const createCategory = async (name: string, description: string) => {
      const res = await request(app.getHttpServer())
        .post('/categories')
        .set(auth)
        .send({ name, description });

      expect(res.status).toBe(201);
      categories[name] = res.body.id;
    };

    await createCategory('Salário', 'Entrada principal do trabalho CLT');
    await createCategory('Alimentação', 'Mercado, restaurantes e delivery');
    await createCategory('Transporte', 'Uber, gasolina, ônibus');

    const makeDate = (daysAgo: number) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      return d.toISOString();
    };

    const incomeDescriptions = [
      'Pagamento salário',
      'Rendimento extra',
      'Consultoria',
      'Projeto freelance',
      'Bônus mensal',
    ];

    const expenseDescriptions = [
      'Uber para reunião',
      'Mercado do mês',
      'Almoço fora',
      'Combustível',
      'Delivery iFood',
      'Cinema final de semana',
    ];


    for (let i = 0; i < 5; i++) {
      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set(auth)
        .send({
          description:
            incomeDescriptions[i % incomeDescriptions.length] +
            ` #${i + 1}`,
          value: 1500 + i * 300,
          type: 'INCOME',
          categoryId: categories['Salário'],
          date: makeDate(i + 1),
        });

      expect(response.status).toBe(201);
    }

    const expenseCategories = [
      'Alimentação',
      'Transporte',
      'Alimentação',
      'Transporte',
      'Alimentação',
      'Transporte',
    ];

    for (let i = 0; i < 6; i++) {
      const category = expenseCategories[i];

      const response = await request(app.getHttpServer())
        .post('/transactions')
        .set(auth)
        .send({
          description:
            expenseDescriptions[i % expenseDescriptions.length] +
            ` #${i + 1}`,
          value: 40 + i * 15,
          type: 'EXPENSE',
          categoryId: categories[category],
          date: makeDate(i + 1),
        });

      expect(response.status).toBe(201);
    }

    const dashboard = await request(app.getHttpServer())
      .get('/dashboard')
      .set(auth);

    expect(dashboard.status).toBe(200);

    expect(dashboard.body).toHaveProperty('balance');
    expect(dashboard.body).toHaveProperty('totalIncome');
    expect(dashboard.body).toHaveProperty('totalExpense');
    expect(dashboard.body).toHaveProperty('topCategories');

    expect(dashboard.body.totalIncome).toBeGreaterThan(0);
    expect(dashboard.body.totalExpense).toBeGreaterThan(0);
    expect(dashboard.body.topCategories.length).toBeGreaterThan(0);
  });
});