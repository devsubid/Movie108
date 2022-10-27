import styled from "styled-components";
import { useContext, useEffect } from "react";
import loadingContext from "../../context/loading/loadingContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: rgb(var(--light-color));
  .light & {
    color: rgb(var(--dark-color));
  }
  & h2 {
    font-size: 5rem;
    font-weight: 700;
  }
`;

function NotFound() {
  const loading = useContext(loadingContext);
  useEffect(
    () => {
      loading.setLoading(0);
    } /* eslint-disable-next-line react-hooks/exhaustive-deps */,
    []
  );
  return (
    <Container className="container">
      <h2>404</h2>
      <p>Page Not Found</p>
    </Container>
  );
}

export default NotFound;
