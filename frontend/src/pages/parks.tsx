import { useEffect, useState } from "react";
import { Modal } from "../components/modal";


function Parks() {
  
  const [park, setPark] = useState<any>();
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (loaded) return;

    (async () => {
      // URL would be whatever this apps domain ends up being
      let url;
      if (process.env.NODE_ENV !== 'production') {
        url = 'http://localhost:5000';
      } else {
        url = window.location.origin;
      }
      const response = await fetch(url + '/api/parks/1');
      const data = await response.json();

      if (data) setPark(data);
    })()

    setLoaded(true);
  }, [loaded])

  const closeModal = () => {
    setShowModal(!showModal);
  }

  return (
    <main className="main_container">
      <header className="section">
        <h2>Hello, US National Parks!</h2>
        <section>
          <p>
            Welcome to the US national parks API. There are 59 US national
            parks, and in this API you can find pretty good information on all
            of them. There are currently only two routes and I'm not sure that
            I'll ever add more but you're welcome to suggest some if you've got
            any ideas.
          </p>
        </section>
      </header>
      <section className="section">
        <h2>
          Route - <code>GET /api/parks/:id</code>
        </h2>
        <article className="list_column">
          <h3>Example React Code</h3>
          <img
            onClick={() => setShowModal(!showModal)}
            style={{ cursor: "pointer" }}
            className="image"
            src={"/fetch.png"}
            alt="Example Fetch"
          />
        </article>
        <article className="list_column">
          <h3>Example Return</h3>
          <pre>{JSON.stringify(park, null, 2)}</pre>
        </article>
      </section>
      <section className="section">
        <h2>
          Route - <code>GET /api/parks</code>
        </h2>
        <p>
          This route will return an array of every park, 59 parks, in the exact
          same format as above. I could print it out here but I don't think
          anyone really needs to see all of that JSON.
        </p>
      </section>
      <section className="section">
        <h2>
          Photos - <code>GET /static/resized/:photo_#.png</code>
        </h2>
        <p>
          All photos are served out of the public directory, so you'll need to
          use the domain + <code>/static/resized/acadia_1.png</code>, for
          example:
        </p>
        <code>http://localhost:5000/static/resized/zion_4.png</code>
        <img
          src={
            process.env.NODE_ENV === "production"
              ? window.location.origin + "/static/resized/zion_4.png"
              : "http://localhost:5000/static/resized/zion_4.png"
          }
          alt="Zion example"
        />
      </section>
      {showModal && (
        <Modal onClose={closeModal}>
          <img
            onClick={() => setShowModal(!showModal)}
            style={{ cursor: "pointer" }}
            className="modal_image"
            src={"/fetch.png"}
            alt="Example Fetch"
          />
        </Modal>
      )}
    </main>
  );
}

export default Parks;