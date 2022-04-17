const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;
const should = chai.should;

chai.use(chaiHttp);

describe("Parks API Routes", function() {

  const baseUrl = "http://localhost:5000";

  it ("should fail", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/fail')
      
    expect(res).to.have.status(404);
  })

  it ("should return a random park", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/api/parks/random_park')
      .set('Content-Type', 'application/json')

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('title');
  })

  it ("should return a random image", async () => {
    const res = await chai 
      .request(baseUrl)
      .get('/api/parks/random_picture')
      .set('Content-Type', 'application/json')

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('string');
  })
  
  it ("should return a park", async () => {
    const res = await chai
      .request(baseUrl)
      .get('/api/parks/1')
      .set('Content-Type', 'application/json')
    
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('title').eq('Acadia');
  })

  it ("should return all parks", async () => {
    const res = await chai
      .request(baseUrl)
      .get('/api/parks')
      .set('Content-Type', 'application/json')
    
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('title').eq('Acadia');
  })
});