import { useLayoutEffect, useState } from "react";
import { Modal } from "../components/modal";


function Parks() {
  
  const [park, setPark] = useState<any>();
  const [loaded, setLoaded] = useState(false);
  const [randomImage, setRandomImage] = useState('');
  const [randomPark, setRandomPark] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useLayoutEffect(() => {
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

  const getRandomImage = async () => {
    const url = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:5000';
    const response = await fetch(url + '/api/parks/random_picture');
    const data = await response.json();
    return setRandomImage(data);
  }

  const getRandomPark = async () => {
    const url = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:5000';
    const response = await fetch(url + '/api/parks/random_park');
    const data = await response.json();
    return setRandomPark(data);
  }

  return (
    <main className="main_container fade_in">
      <header id="top" className="section">
        <h2>Hello, US National Parks!</h2>
        <article>
          <p>
            Welcome to the US national parks API. There are 59 US national
            parks, and in this API you can find pretty good information on all
            of them. There are currently only a few routes and I'm not sure that
            I'll ever add more but you're welcome to suggest some if you've got
            any ideas.
          </p>
        </article>
        <h3>Table of Contents</h3>
        <ul className="list">
          <li>
            <a className="scroll" href="#park">
              GET /api/parks/:id
            </a>
          </li>
          <li>
            <a className="scroll" href="#parks">
              GET /api/parks
            </a>
          </li>
          <li>
            <a className="scroll" href="#random_picture">
              GET /api/parks/random_picture
            </a>
          </li>
          <li>
            <a className="scroll" href="#random_park">
              GET /api/parks/random_park
            </a>
          </li>
          <li>
            <a className="scroll" href="#photos">
              GET /static/resized/:photo_#.png
            </a>
          </li>
        </ul>
      </header>
      <section id="park" className="section">
        <aside className="top">
          <a className="scroll" href="#top">
            Top
          </a>
        </aside>
        <h2>
          Route - <code>GET /api/parks/:id</code>
        </h2>
        <figure className="list_column">
          <h3>Example React Code</h3>
          <img
            onClick={() => {
              setModalImage("/fetch.png");
              setShowModal(!showModal);
            }}
            style={{ cursor: "pointer" }}
            className="image"
            src={"/fetch.png"}
            alt="Example Fetch"
          />
        </figure>
        <article className="list_column">
          <h3>Example Return</h3>
          <pre>{JSON.stringify(park, null, 2)}</pre>
        </article>
      </section>
      <section id="parks" className="section">
        <aside className="top">
          <a className="scroll" href="#top">
            Top
          </a>
        </aside>
        <h2>
          Route - <code>GET /api/parks</code>
        </h2>
        <p>
          This route will return an array of every park, 59 parks, in the exact
          same format as above. I could print it out here but I don't think
          anyone really needs to see all of that JSON.
        </p>
      </section>
      <section id="random_picture" className="section">
        <aside className="top">
          <a className="scroll" href="#top">
            Top
          </a>
        </aside>
        <h2>
          Random - <code>GET /api/parks/random_picture</code>
        </h2>
        <p>
          This route will serve the relative location of a random picture, so
          just plug it right into a source tag with the origin to display a
          random image!
        </p>
        <code>
          {process.env.NODE_ENV === "production"
            ? window.location.origin + "/api/parks/random_picture"
            : "http://localhost:5000/api/parks/random_picture"}
        </code>
        <section className="list_column">
          <button
            onClick={() => getRandomImage()}
            type="button"
            name="Get Random Park Image"
            className="link"
          >
            Get Random
          </button>
          {randomImage && (
            <img
              className="image fade_in"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setModalImage(
                  process.env.NODE_ENV === "production"
                    ? window.location.origin + randomImage
                    : "http://localhost:5000" + randomImage
                );
                setShowModal(!showModal);
              }}
              src={
                process.env.NODE_ENV === "production"
                  ? window.location.origin + randomImage
                  : "http://localhost:5000" + randomImage
              }
              alt="Zion example"
            />
          )}
        </section>
      </section>
      <section id="random_park" className="section">
        <aside className="top">
          <a className="scroll" href="#top">
            Top
          </a>
        </aside>
        <h2>
          Random - <code>GET /api/parks/random_park</code>
        </h2>
        <p>
          This route will serve up a randomly picked park from one of the 59
          parks. It will return it in the same format as the{" "}
          <code>/api/parks/:id</code> but I'll add the preview here just in case
          you like clicking buttons like I do.
        </p>
        <code>
          {process.env.NODE_ENV === "production"
            ? window.location.origin + "/api/parks/random_park"
            : "http://localhost:5000/api/parks/random_park"}
        </code>
        <section className="list_column">
          <button
            onClick={() => getRandomPark()}
            type="button"
            name="Get Random Park Info"
            className="link"
          >
            Get Random
          </button>
          {randomPark && (
            <article className="list_column fade_in">
              <h3>Example Return</h3>
              <h5>{randomPark.title}</h5>
              <pre>{JSON.stringify(randomPark, null, 2)}</pre>
            </article>
          )}
        </section>
      </section>
      <section id="photos" className="section">
        <aside className="top">
          <a className="scroll" href="#top">
            Top
          </a>
        </aside>
        <h2>
          Photos - <code>GET /static/resized/:photo_#.png</code>
        </h2>
        <p>
          All photos are served out of the public directory, so you'll need to
          use the domain + <code>/static/resized/acadia_1.png</code>, for
          example:
        </p>
        <code>
          {
            process.env.NODE_ENV === "production"
              ? window.location.origin + "/static/resized/zion_4.png"
              : "http://localhost:5000/static/resized/zion_4.png"
          }
        </code>
        <figure className='list_column'>
          <img
            style={{ cursor: "pointer" }}
            className="image"
            onClick={(e) => {
              setModalImage(
                process.env.NODE_ENV === "production"
                  ? window.location.origin + "/static/resized/zion_4.png"
                  : "http://localhost:5000/static/resized/zion_4.png"
              );
              setShowModal(!showModal);
            }}
            src={
              process.env.NODE_ENV === "production"
                ? window.location.origin + "/static/resized/zion_4.png"
                : "http://localhost:5000/static/resized/zion_4.png"
            }
            alt="Zion example"
          />
        </figure>
      </section>
      {showModal && (
        <Modal onClose={closeModal}>
          <img
            onClick={() => setShowModal(!showModal)}
            style={{ cursor: "pointer" }}
            className="modal_image"
            src={modalImage}
            alt="Example Fetch"
          />
        </Modal>
      )}
    </main>
  );
}

export default Parks;