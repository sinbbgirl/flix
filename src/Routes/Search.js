import { movieApi, tvApi } from "api";
import React, { useState } from "react";
import Helmet from 'react-helmet'
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const Search = () => {
  const [term, setTerm] = useState("");
  const [tvResults, setTvResults] = useState(null);
  const [movieResults, setMovieResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term !== "") {
      getData();
    }
  };

  const updateTerm = (e) => {
    setTerm(e.target.value);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const {
        data: { results: movieResults },
      } = await movieApi.movieSearch(term);
      const {
        data: { results: tvResults },
      } = await tvApi.tvSearch(term);
      console.log(movieResults, tvResults);
      setMovieResults(movieResults);
      setTvResults(tvResults);
    } catch (e) {
      setError(`결과를 찾을수 없습니다`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder='영화나 TV프로그램을 검색하세요'
          value={term}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Helmet>
            <title>검색 | GTFlix</title>
          </Helmet>
          {movieResults && movieResults.length > 0 && (
            <Section title='영화'>
              {movieResults.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imageUrl={movie.poster_path}
                  rating={movie.vote_average}
                  year={
                    movie.release_date && movie.release_date.substring(0, 4)
                  }
                  isMovie={true}
                />
              ))}
            </Section>
          )}
          {tvResults && tvResults.length > 0 && (
            <Section title='TV 프로그램'>
              {tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  title={show.name}
                  imageUrl={show.poster_path}
                  rating={show.vote_average}
                  year={
                    show.first_air_date && show.first_air_date.substring(0, 4)
                  }
                />
              ))}
            </Section>
          )}
          {error && <Message color='#ff4646' text={error} />}
          {movieResults &&
            tvResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
              <Message color='#tvResults' text='결과를 찾을 수 없습니다' />
            )}
        </>
      )}
    </Container>
  );
};

export default Search;
