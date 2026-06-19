import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('CASE SEED E2E - REAL DATA', () => {
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

      categories[name] = res.body.id;
    };

    await createCategory('Salário', 'Entrada principal do trabalho CLT');
    await createCategory('Freelance', 'Projetos extras e renda variável');
    await createCategory('Investimentos', 'Dividendos e rendimentos');
    await createCategory('Alimentação', 'Mercado, restaurantes e delivery');
    await createCategory('Transporte', 'Uber, gasolina, ônibus');
    await createCategory('Moradia', 'Aluguel, contas de casa');
    await createCategory('Lazer', 'Rolês, cinema, viagens');
    await createCategory('Saúde', 'Farmácia e consultas');
    await createCategory('Assinaturas', 'Netflix, Spotify, SaaS');
    await createCategory('Imprevistos', 'Gastos inesperados');

    const makeDate = (daysAgo: number) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      return d.toISOString();
    };

    const incomeDescriptions = [
      'Pagamento salário',
      'Projeto freelance React',
      'Consultoria tech',
      'Venda de serviço',
      'Rendimento investimento',
    ];

    const expenseDescriptions = [
      'Uber para reunião',
      'Mercado do mês',
      'Almoço fora',
      'Netflix mensalidade',
      'Spotify Premium',
      'Farmácia',
      'Combustível',
      'Delivery iFood',
      'Cinema final de semana',
      'Conta de luz',
    ];


    for (let i = 0; i < 40; i++) {
      await request(app.getHttpServer())
        .post('/transactions')
        .set(auth)
        .send({
          description:
            incomeDescriptions[i % incomeDescriptions.length] +
            ` #${i + 1}`,
          value: Math.floor(Math.random() * 5000 + 2000),
          type: 'INCOME',
          categoryId:
            i % 3 === 0
              ? categories['Salário']
              : i % 3 === 1
              ? categories['Freelance']
              : categories['Investimentos'],
          date: makeDate(i),
        });
    }

    const expenseCategories = [
      'Alimentação',
      'Transporte',
      'Moradia',
      'Lazer',
      'Saúde',
      'Assinaturas',
      'Imprevistos',
    ];

    for (let i = 0; i < 60; i++) {
      const category =
        expenseCategories[i % expenseCategories.length];

      await request(app.getHttpServer())
        .post('/transactions')
        .set(auth)
        .send({
          description:
            expenseDescriptions[i % expenseDescriptions.length] +
            ` #${i + 1}`,
          value: Math.floor(Math.random() * 800 + 30),
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
    expect(dashboard.body.topCategories.length).toBeGreaterThan(0);
  });
});