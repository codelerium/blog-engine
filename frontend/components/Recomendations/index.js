import React from 'react';
import { PillarBox } from '../PillarBox/index';
import { Image } from '../Image/index';
import styled from 'styled-components';

export const Recommendations = (props) => (
  props.recommendations.length && (
    <RecommendationWrapper>
      <PillarBox>
        <RecommendationTitle>
          Recommended
        </RecommendationTitle>
        <StyledRecommendations>
          <Recommendation href={`/article/${props.recommendations[0].slug}`}>
            <Prev>
              <ImageWrapperPrev>
                <Image url={props.recommendations[0].thumbnail}/>
              </ImageWrapperPrev>
              <TextWrapper>
                <TextLabel>Previous article</TextLabel>
                <TextTitle>{props.recommendations[0].title}</TextTitle>
              </TextWrapper>
            </Prev>
          </Recommendation>
          <Recommendation href={`/article/${props.recommendations[1].slug}`}>
            <Next>
              <TextWrapper>
                <TextLabel>Next article</TextLabel>
                <TextTitle>{props.recommendations[1].title}</TextTitle>
              </TextWrapper>
              <ImageWrapperNext>
                <Image url={props.recommendations[1].thumbnail}/>
              </ImageWrapperNext>
            </Next>
          </Recommendation>
        </StyledRecommendations>
      </PillarBox>
    </RecommendationWrapper>
  )
);

const RecommendationWrapper = styled.div`
  padding: 160px 0;
  border-top: 1px solid ${p => p.theme.color['gray-10']};
`;

const RecommendationTitle = styled.h2`
  margin: 0;
  margin-bottom: 40px;
`;

const StyledRecommendations = styled.div`
  display: flex;
  width: 100%;
`;

const Recommendation = styled.a`
  flex: 1;
  color: black;
  text-decoration: none;
`;

const Prev = styled.div`
  display: flex;
  text-align: left;
  border-right: 1px solid ${p => p.theme.color['gray-10']};
`;

const Next = styled.div`
  display: flex;
  text-align: right;
  justify-content: flex-end;
`;

const TextTitle = styled.h3`
  margin: 0;
`;

const TextLabel = styled.div`
  color: ${p => p.theme.color['gray-70']};
`;

const ImageWrapper = styled.div`
  width: 120px;
`;

const ImageWrapperPrev = styled(ImageWrapper)`
  margin-right: 20px;
`;

const ImageWrapperNext = styled(ImageWrapper)`
  margin-left: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;