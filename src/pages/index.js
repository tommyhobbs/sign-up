import { useRef } from "react";

export default function Home({ handleSendToBrevo }) {
  const formRef = useRef(null);
  const formHeaderRef = useRef(null);
  const formHandler = (e) => {
    e.preventDefault();

    const email = e.target?.elements?.email?.value;
    const phone = e.target?.elements?.phone?.value;

    if (formHeaderRef?.current && formRef?.current) {
      formHeaderRef.current.style.display = "none";
      formRef.current.innerHTML = `loading...`;
    }

    return fetch("/api/brevo", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        phone,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status !== 200) {
          console.error("Network response was not ok " + response.statusText);
        } else {
          console.log("ok");
        }
      })
      .then(() => {
        if (formHeaderRef?.current && formRef?.current) {
          formHeaderRef.current.style.display = "none";
          formRef.current.innerHTML = `<h2 class="form-header">You’re all signed up <br/><br/> Be sure to watch your inbox for upcoming Events, news and updates from the Drop</h2>`;
        }
      });
  };

  return (
    <div style={{ margin: "auto" }}>
      <h2 className="form-header" ref={formHeaderRef}>
        Sign up for priority access to early bird tickets
      </h2>
      <form
        id="submit-form"
        name="contact"
        onSubmit={formHandler}
        ref={formRef}
      >
        <input type="hidden" name="form-name" value="contact" />
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="EMAIL"
        />
        <input
          type="phone"
          name="phone"
          id="phone"
          placeholder="MOBILE NUMBER (OPTIONAL)"
        />
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            gap: "12px",
          }}
        >
          <input
            type="checkbox"
            id="consent"
            name="consent"
            value="true"
            required
          />
          <label htmlFor="consent" className="consent">
            By providing your personal data, you consent to us sending you
            marketing and other communications about our services and products.
            For more information about how we use your personal data, please see
            our privacy policy.
          </label>
          <br />
        </div>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
