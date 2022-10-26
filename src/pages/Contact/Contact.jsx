import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingContext from "../../context/loading/loadingContext";
import Button from "./../../components/Button/Button";

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding-block: 1rem;
  & .status.success {
    color: green;
  }
  & .status.error {
    color: red;
  }
  & button {
    transition: all 0.15s ease;
    @media screen and (max-width: 50rem) {
      & {
        width: 100%;
      }
    }
  }
`;

function Contact() {
  const loading = useContext(LoadingContext);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    document.title = "Contact | Movie108";
    let form = document.getElementById("contact-form");
    form.name.focus();
    return () => {
      loading.setLoading(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="contactPage container">
      <h2
        style={{
          color: "rgb(var(--primary-color))",
        }}
      >
        <ion-icon
          name="mail-open-outline"
          style={{
            fontSize: "1.25rem",
          }}
        ></ion-icon>{" "}
        Contact me
      </h2>
      <p>
        I'm currently looking for a new opportunity, my inbox is always open.
        Whether you have a question or just want to say hi, I'll try my best to
        get back to you!
      </p>
      <ContactForm
        id="contact-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetch(`https://formspree.io/f/mpznyren`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: e.target.name.value,
              email: e.target.email.value,
              message: e.target.message.value,
              device: navigator.userAgent,
            }),
          }).then((res) => {
            console.log(res.status);
            if (res.status === 200) {
              setStatus({
                type: "success",
                message: "Message sent successfully!",
              });
              e.target.reset();
            } else {
              setStatus({
                type: "error",
                message: "Message failed to send.",
              });
            }
          });
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name..."
            id="name"
            pattern="[A-Za-z ]{3,}"
            title="Please enter at least 3 characters"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email..."
            id="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="Please enter a valid email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            placeholder="Enter your message..."
            rows="5"
            required
          ></textarea>
        </div>
        <Button className="primary" btnProperty="primary" type="submit">
          Send
        </Button>
        {status &&
          (() => {
            setTimeout(() => {
              setStatus(null);
            }, 5000);
            return (
              <div className={`status ${status.type}`}>{status.message}</div>
            );
          })()}
      </ContactForm>
    </div>
  );
}

export default Contact;
