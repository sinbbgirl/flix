import React, { useEffect, useState } from "react";
import { tvApi } from "api";
import Helmet from "react-helmet";
import Loader from "Components/Loader/Loader";
import styled from "styled-components";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 20px 20px;
`;

const TV = () => {
  const [airingToday, setAiringToday] = useState(null);
  const [popular, setPopular] = useState(null);
  const [onTheAir, setOnTheAir] = useState(null);
  const [topRated, setTopRated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { results: onTheAir },
      } = await tvApi.onTheAir();
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      setAiringToday(airingToday);
      setPopular(popular);
      setOnTheAir(onTheAir);
      setTopRated(topRated);
    } catch (e) {
      setError("TV프로그램을 찾을 수 없습니다!");
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
        <title>TV | GTFlix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>TV | GTFlix</title>
      </Helmet>
      {popular && popular.length > 0 && (
        <Section title='요즘 완전 대세!'>
          {popular.map((show, i) => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {topRated && topRated.length > 0 && (
        <Section title='후회는 없다! 꿀잼 보장'>
          {topRated.map((show, i) => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title='오늘 방영할 작품'>
          {airingToday.map((show, i) => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {onTheAir && onTheAir.length > 0 && (
        <Section title='현재 방영중'>
          {onTheAir.map((show, i) => (
            <Poster
              key={show.id}
              id={show.id}
              title={show.name}
              imageUrl={show.poster_path}
              rating={show.vote_average}
              year={show.first_air_date && show.first_air_date.substring(0, 4)}
            />
          ))}
        </Section>
      )}
      {error && <Message text={error} color='#ff4646' />}
    </Container>
  );
};

export default TV;
