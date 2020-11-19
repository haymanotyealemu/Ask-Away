import styled from 'styled-components';

export const Container = styled.div`
  max-height:300px;
  width:100%;
  padding: 5px 10px;
  background-color: #4CAF82;
  margin-bottom: 0;

`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;

    /* background: red; */
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
grid-gap: 20px;
@media (max-width: 1000px) {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
`;

export const Link = styled.a`
  color: #fff;
  font-size: 18px;
  text-decoration: none;

  &:hover {
      color: #ff9c00;
      transition: 200ms ease-in;
  }
`;

export const Title = styled.p`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;