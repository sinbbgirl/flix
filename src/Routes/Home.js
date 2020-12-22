import React, { useEffect, useState } from "react";
import { movieApi } from "api";
import Loader from "Components/Loader/Loader";
import Helmet from "react-helmet";
import styled from "styled-components";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px 20px;
`;

const Movie = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [popular, setPopular] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: popular },
      } = await movieApi.popular();
      const {
        data: { results: topRated },
      } = await movieApi.topRated();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      setNowPlaying(nowPlaying);
      setPopular(popular);
      setTopRated(topRated);
      setUpcoming(upcoming);
    } catch (e) {
      setError("영화를 찾을 수 없습니다!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>영화 | GTFlix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>영화 | GTFlix</title>
      </Helmet>
      {popular && popular.length > 0 && (
        <Section title='요즘 완전 대세!'>
          {popular.map((movie, i) => (
            <Poster
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title='인생 영화!'>
          {topRated.map((movie, i) => (
            <Poster
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title='현재 상영중'>
          {nowPlaying.map((movie, i) => (
            <Poster
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title='개봉 예정작'>
          {upcoming.map((movie, i) => (
            <Poster
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imageUrl={movie.poster_path}
              rating={movie.vote_average}
              year={movie.release_date && movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </Section>
      )}
      {error && <Message text={error} color='#ff4646' />}
    </Container>
  );
};

export default Movie;
