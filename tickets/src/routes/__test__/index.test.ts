import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
    return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title, price
    });
}

it('can fetch a list of tickets', async () => {
    await createTicket('deneme 1', 20);
    await createTicket('deneme 2', 20);
    await createTicket('deneme 3', 20);

    const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

    expect(response.body.length).toEqual(3);
});