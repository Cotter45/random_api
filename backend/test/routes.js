const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;
const should = chai.should;

chai.use(chaiHttp);

describe("Parks API Routes", function() {

  const baseUrl = "http://localhost:5000";

  it("returns status 200", async () => {
    const res = await chai
      .request(baseUrl)
      .get('/')
      .set('Content-Type', 'application/json')

    console.log(res.body)
    expect(res).to.have.status(200);
    expect(res).to.be.an('object');
    expect(res.body).to.have.property('message').eq('Hello World!')
  });

  it ("should return a park", async () => {
    const res = await chai
      .request(baseUrl)
      .get('/api/parks/1')
      .set('Content-Type', 'application/json')
    
    console.log(res.body);
    expect(res).to.have.status(200);
  })
});