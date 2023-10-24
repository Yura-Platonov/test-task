import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  min-height: 100vh;

  display: flex;
  /* flex-direction: column;
  justify-content: center; */
  align-items: center;

  background-color: rgba(255, 170, 255, 0.667);
`;

export const FormBox = styled.div`
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 18px;

  @media screen and (max-width: 374px) {
    width: 100%;
    max-width: 335px;
  }
  @media screen and (min-width: 375px) {
    width: 335px;
  }
  @media screen and (min-width: 768px) {
    width: 480px;
    margin-bottom: 24px;
  }
`;