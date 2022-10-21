import React from "react";
import styled from "styled-components";

const FooterElement = styled.footer`
  color: currentColor;
  padding: 1rem;
  text-align: center;
  margin-top: 0;
  transition: all 0.15s ease;
  & .container {
    margin-top: 0;
  }
  & .row {
    display: flex;
    width: 100%;
    gap: 5rem;
    @media screen and (max-width: 50rem) {
      flex-direction: column;
      gap: 2rem;
    }
    & .col {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      text-align: left;
      @media screen and (max-width: 50rem) {
        text-align: center;
      }
      & .col-header {
        & h2 {
          font-size: 1.5rem;
          color: rgb(var(--primary-color));
          text-transform: uppercase;
        }
        & span {
          font-size: 1rem;
          color: rgb(var(--light-color), 0.5);
          .light & {
            color: rgb(var(--dark-color), 0.5);
          }
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      & .col-body {
        & ul {
          list-style: none;
          & li {
            font-size: 0.9rem;
            color: rgb(var(--light-color), 0.5);
            font-weight: 300;
            .light & {
              color: rgb(var(--dark-color), 0.5);
            }
          }
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterElement>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="col-header">
              <h2>itsme-Subid</h2>
              <span>Full-Stack Web Developer</span>
            </div>
            <div className="col-body">
              <ul>
                <li>
                  Designed and built with all the love in the world by the
                  itsme-Subid using react.js.
                </li>
                <li>Code licensed GNU General Public License v3.0.</li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="col-header">
              <h2>Links</h2>
            </div>
            <div className="col-body">
              <ul>
                <li>
                  <a
                    href="http://github.com/itsme-subid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="http://linkedin.com/in/itsme-subid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="http://twitter.com/ItsmeSubid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="http://instagram.com/itsme-subid"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col">
            <div className="col-header">
              <h2>Projects</h2>
            </div>
            <div className="col-body">
              <ul>
                <li>
                  <a
                    href="https://news365-itsme-subid.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    News365
                  </a>
                </li>
                <li>
                  <a
                    href="https://resume-builder-itsme-subid.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume Builder
                  </a>
                </li>
                <li>
                  <a
                    href="https://itsme-subid.github.io/MyNotebook/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MyNotebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://itsme-subid.github.io/Password-Generator/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Password Generator
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </FooterElement>
  );
};

export default Footer;
