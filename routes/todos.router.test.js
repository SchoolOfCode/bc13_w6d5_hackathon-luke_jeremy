import supertest from 'supertest';
import app from '../app.js';
import { expect, test} from '@jest/globals';
import { resetAllTables } from "../db/scripts/helpers.js";
import { pool } from "../db/index.js";

// reset all tables before each test
beforeEach(() => {
  return resetAllTables();
});

afterAll(() => {
  return pool.end();
});

//check get request for all users
describe('GET /api/todos', () => {
   
  //check the structure of the response.body
  it('checks the structure of the response.body', async() => {
     const response = await supertest(app).get("/api/todos");
     expect(response.status).toBe(200);
     expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
     });
  })
      //check the structure of payload
  
  it('checks the structure of the payload in the response body', async () => {
    const response = await supertest(app).get("/api/todos");
    const toDoObj = response.body.payload;
      for(let i = 0; i<toDoObj.length; i++) {
              
        expect(toDoObj[i]).toStrictEqual({
          id: expect.any(Number),
          task: expect.any(String),
          completion_date: expect.any(String)
  
        })
       }
     })
})


//check post request 
describe('POST /api/todos', () => {
  it('checks the request body', async () => {
    
    const payload = {task: "go for a walk", completionDate: "2021-02-02"};
    const response = await supertest(app).post('/api/todos')
                          .send(payload)
                          .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.success).toBeTruthy;
    expect(response.body.payload.task).toMatch("go for a walk");
    expect(response.body.payload.completion_date).toMatch("2021-02-02");
                              
  })
})

describe('POST /api/todos', () => {
  it('checks missing request body', async() => {
    const payload = { completion_date: "201"};
    const response = await supertest(app).post('/api/todos')
                          .send(payload)
                          .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.success).toBeFalsy;
    expect(response.body.error).toMatch("Please provide a 'task' and 'completionDate")
   })
  
})

describe('DELETE /api/todos/some_id', () => {
  it('checks success in deleting an item by id', async() => {
    const myId = 1
    const url = `/api/todos/${myId}`
    const response = await supertest(app).del(url)

    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({
        success: true,
        payload: {
            id: myId,
            task: expect.any(String),
            completion_date: expect.any(String)
        }
    })
  })
})
    
    


