import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 180px;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 4px;
  background-position: center center;
  transition: all 0.3s ease-in-out; ;
`;

const Rating = styled.span`
  position: absolute;
  bottom: 5px;
  right: 2px;
  opacity: 0;
  transition: all 0.3s ease-in-out;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.5;
      transform: scale(1.1);
    }
    ${Rating} {
      transform: scale(1.3);
      opacity: 1;
      bottom: 0px;
      right: 7px;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : "/NoImage.png"
          }
        />
        <Rating>
          <span role='img' aria-label='rating'>
            ⭐
          </span>{" "}
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 11 ? `${title.substring(0, 11)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

export default Poster;
