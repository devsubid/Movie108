import { useContext, useEffect } from "react";
import styled from "styled-components";
import LoadingContext from "../../context/loading/loadingContext";
import github from "../../assets/github.svg";
import heart from "../../assets/heart.svg";
import checkmark from "../../assets/checkmark.svg";

const AboutDiv = styled.div`
  &.about h2 {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: rgb(var(--primary-color));
  }
  &.about p {
    font-size: 1.15em;
    padding-block: 1rem;
    font-weight: 300;
  }
  .open-source {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-block: 2rem;
  }
  .open-source h3 {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
  .open-source h3 .svg {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-color: rgb(var(--primary-color));
    -webkit-mask: url(${github}) no-repeat center;
    mask: url(${github}) no-repeat center;
  }
  .features {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
    padding-block: 2rem;
  }
  .features h3 {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
  .features h3 .svg {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-color: rgb(var(--primary-color));
    -webkit-mask: url(${checkmark}) no-repeat center;
    mask: url(${checkmark}) no-repeat center;
  }
  .features li {
    list-style-type: decimal-leading-zero;
    font-size: 1.15em;
  }
  .open-source a {
    color: rgb(var(--primary-color));
    text-decoration: none;
  }

  .open-source a:hover {
    text-decoration: underline;
  }
  &.about .credits {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-block: 2rem;
  }
  &.about .credits h3 {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }
  &.about .credits h3 .svg {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    background-color: rgb(var(--primary-color));
    -webkit-mask: url(${heart}) no-repeat center;
    mask: url(${heart}) no-repeat center;
  }
  &.about .credits p {
    font-size: 1.15em;
    padding-block: 1rem;
    font-weight: 300;
  }
  &.about .credits a {
    color: rgb(var(--primary-color));
    text-decoration: none;
  }
  &.about .credits a:hover {
    text-decoration: underline;
  }
`;

const About = () => {
  const loading = useContext(LoadingContext);
  useEffect(() => {
    document.title = "About | Movie108";
    return () => {
      loading.setLoading(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AboutDiv className="about container">
      <h2>About</h2>
      <p>
        Movie108 is a simple, straightforward web app to see ratings, reviews,
        post reviews and ratings. There are no bells and whistles, just a simple
        interface to see ratings, reviews, post reviews and ratings. It is built
        using ReactJS.
        <br /> You can also change theme of the web app to suit your eye sight.
        Movie108 is available for free on the web. Movie108 doesn't have any
        paid version that will gives you access to additional features, nor does
        it have any in-app purchases.
      </p>
      <div className="features">
        <h3>
          <div className="svg"></div>
          Features Overview:
        </h3>
        <li>Modern, intuitive user interface.</li>
        <li>Easy Access.</li>
        <li>Secure and Free.</li>
        <li>No In-App purchases.</li>
        <li>Available on the web.</li>
        <li>Genuine reviews and rating.</li>
        <li>Dark Theme / Night mode.</li>
        <li>Beautiful interface.</li>
        <li>Search.</li>
        <li>Star Rating.</li>
        <li>Sign Up, Login.</li>
        <li>Delete Account.</li>
        <li>Infinite Scroll.</li>
      </div>
      <div className="open-source">
        <h3>
          <div className="svg"></div>Open Source:
        </h3>
        <p>
          Movie108 is an open source project. You can find the source code on{" "}
          <a
            href="https://github.com/itsme-Subid/Movie108"
            target={"_blank"}
            rel="noreferrer"
          >
            GitHub.
          </a>
          <br />
          I'm currently using <strong>react.js</strong> to build Movie108.
        </p>
      </div>
      <div className="credits">
        <h3>
          <div className="svg"></div>Credits:
        </h3>
        <p>
          Movie108 is built by{" "}
          <a
            href="https://github.com/itsme-Subid"
            target={"_blank"}
            rel="noreferrer"
          >
            Subid
          </a>
          .<br />
          The icons used in Movie108 are from{" "}
          <a
            href="https://ionic.io/ionicons"
            target={"_blank"}
            rel="noreferrer"
          >
            Ionicons
          </a>
          .<br />
          The font used in Movie108 is from{" "}
          <a
            href="https://fonts.google.com/"
            target={"_blank"}
            rel="noreferrer"
          >
            Google Fonts
          </a>
          .
        </p>
      </div>
    </AboutDiv>
  );
};

export default About;
