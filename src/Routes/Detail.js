import { movieApi, tvApi } from "api";
import Loader from "Components/Loader/Loader";
import Message from "Components/Message";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Section from "Components/Section";
import Poster from "Components/Poster";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px 15%;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Cover = styled.div`
  width: 45%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 55%;
  margin-left: 50px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 2.2;
  width: 80%;
  margin-bottom:10px;
`;

const IMDBImage = styled.div`
  display: inline-block;
  background-image: url("/IMDB.png");
  height: 25px;
  width: 25px;
  background-size: cover;
  background-position: center center;
`;

const DBLink = styled.a``;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  margin: 10px 0;
`;

const Iframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Detail = ({
  match: {
    params: { id },
  },
  history: { push },
  location: { pathname },
}) => {
  const parsedID = Number(id);
  const isMovie = pathname.includes("/movie/");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    let searchResult = null;
    try {
      if (isMovie) {
        ({ data: searchResult } = await movieApi.movieDetail(parsedID));
      } else {
        ({ data: searchResult } = await tvApi.showDetail(parsedID));
      }
      setResult(searchResult);
    } catch (e) {
      setError(`Error:${e}`);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isNaN(parsedID)) {
      return push("/");
    }
    getData();
  }, []);

  return loading ? (
    <>
      <Helmet>
        <title>로딩중... | GTFlix</title>
      </Helmet>
      <Loader />
    </>
  ) : error ? (
    <Message text={error} color='#f00' />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.title ? `영화 | ${result.title}` : `TV | ${result.name}`}
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : "/NoImage.png"
          }
        />
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
              년
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]}분
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, i) =>
                  i === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            {result.imdb_id ? (
              <>
                <Divider>•</Divider>
                <Item>
                  <DBLink
                    href={`https://www.imdb.com/title/${result.imdb_id}`}
                    target='_blank'
                  >
                    <IMDBImage />
                  </DBLink>
                </Item>
              </>
            ) : (
              ""
            )}
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.videos && result.videos.results.length > 0 && (
            <VideoContainer>
              <Iframe
                src={`https://www.youtube.com/embed/${result.videos.results[0].key}`}
                width='80%'
                height='40%'
                allowFullScreen
              />
            </VideoContainer>
          )}
          {result.created_by && result.created_by.length > 0 && (
            <Section title='제작진'>
              {result.created_by.map((item) => (
                <Poster title={item.name} imageUrl={item.profile_path} />
              ))}
            </Section>
          )}
          {result.production_companies &&
            result.production_companies.length > 0 && (
              <Section title='제작사'>
                {result.production_companies.map((item) => (
                  <Poster title={item.name} imageUrl={item.logo_path} />
                ))}
              </Section>
            )}
          {result.seasons && result.seasons.length > 0 && (
            <Section title='시즌 정보'>
              {result.seasons.map((item) => (
                <Poster title={item.name} imageUrl={item.poster_path} />
              ))}
            </Section>
          )}
        </Data>
      </Content>
    </Container>
  );
};

export default Detail;
