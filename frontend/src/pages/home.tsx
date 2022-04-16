import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../components/modal";


function Home() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <main className="main_container">
      <header className="section">
        <h2>Hello, World!</h2>
        <section>
          <p>
            My name is Sean and welcome to my little API project, this is mainly
            a small project that I will be adding to over time to test any new
            technologies I'm trying to learn. Since I will be needing the data,
            maybe other folks will too! So I made it public, please don't abuse
            it. Or do, let's see what it can handle.
          </p>
        </section>
      </header>
      <section className="section">
        <h2>API Contents</h2>
        <section className="list_item">
          <label>1. Parks API</label>
          <button
            onClick={() => navigate("/parks")}
            type="button"
            className="link"
          >
            Parks
          </button>
        </section>
        <article className="list_column">
          <p>
            This is a section of the API under <code>/parks</code> where you can
            query for national park data and a few pictures of each park. The
            quality is not great as they've been severely minimized. For example
            -
          </p>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(!showModal)}
            className="image"
            src={
              process.env.NODE_ENV === "production"
                ? window.location.origin + "/static/resized/acadia_2.png"
                : "http://localhost:5000/static/resized/acadia_2.png"
            }
            alt="Park test example"
          />
          <p>
            Not so bad when it's small, or less than 500px, but if you click on
            the image and view it in the modal you'll see what I mean. There are
            currently 2 routes available: <code>/parks</code> which returns all
            the parks, their states and the relative links for their 5 images
            and <code>/parks/:id</code> where id is the integer of the park
            which returns that park, their states and the relative links for
            their 5 images.
          </p>
        </article>
      </section>
      {showModal && (
        <Modal onClose={closeModal}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(!showModal)}
            className="modal_image"
            src={
              process.env.NODE_ENV === "production"
                ? window.location.origin + "/static/resized/acadia_2.png"
                : "http://localhost:5000/static/resized/acadia_2.png"
            }
            alt="Park test example"
          />
        </Modal>
      )}
    </main>
  );
}

export default Home;