import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('CASE SEED E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('seed completo: user + categorias + 55 transações', async () => {
    const email = 'case@test.com';
    const password = '123456';

    
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Case User',
        email,
        password,
      });

    
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password });

    const token = loginRes.body.access_token;

    const auth = {
      Authorization: `Bearer ${token}`,
    };

    
    const categories: Record<string, string> = {};

    const createCategory = async (
      name: string,
      description: string,
    ) => {
      const res = await request(app.getHttpServer())
        .post('/categories')
        .set(auth)
        .send({ name, description });

      categories[name] = res.body.id;
    };

    await createCategory(
      'Alimentação',
      'Gastos com mercado e comida',
    );

    await createCategory(
      'Transporte',
      'Uber, ônibus e locomoção',
    );

    await createCategory(
      'Fornecedor',
      'Pagamentos para fornecedores',
    );

    await createCategory(
      'Receita de Cliente',
      'Entradas de serviços e contratos',
    );

    
    const makeDate = (daysAgo: number) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      return d.toISOString();
    };

    const incomeDescriptions = [
      'Pagamento cliente',
      'Projeto entregue',
      'Consultoria',
      'Contrato mensal',
      'Serviço recorrente',
    ];

    const expenseDescriptions = [
      'Uber reunião',
      'Mercado semanal',
      'Fornecedor API',
      'Almoço cliente',
      'Compra insumo',
    ];

    
    for (let i = 0; i < 30; i++) {
      await request(app.getHttpServer())
        .post('/transactions')
        .set(auth)
        .send({
          description:
            incomeDescriptions[i % incomeDescriptions.length] +
            ` #${i + 1}`,
          value: Math.floor(Math.random() * 2500 + 500),
          type: 'INCOME',
          categoryId: categories['Receita de Cliente'],
          date: makeDate(i),
        });
    }

    
    const expenseCategories = [
      'Alimentação',
      'Transporte',
      'Fornecedor',
    ];

    for (let i = 0; i < 25; i++) {
      const category =
        expenseCategories[i % expenseCategories.length];

      await request(app.getHttpServer())
        .post('/transactions')
        .set(auth)
        .send({
          description:
            expenseDescriptions[i % expenseDescriptions.length] +
            ` #${i + 1}`,
          value: Math.floor(Math.random() * 600 + 50),
          type: 'EXPENSE',
          categoryId: categories[category],
          date: makeDate(i),
        });
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
    expect(dashboard.body.topCategories.length).toBeGreaterThan(
      0,
    );
  });
});