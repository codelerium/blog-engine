import React from 'react';
import s from './styles.less'
import { PillarBox } from '../PillarBox/index';
import { Image } from '../Image/index';

export const Recommendations = (props) => (
  props.recommendations.length && (
    <div className={s.recommendation_wrapper}>
      <PillarBox>
        <h2 className={s.heading}>Recommended</h2>
        <div className={s.recommendations}>
          <a href={`/article/${props.recommendations[0].slug}`} className={s.recommendation}>
            <div className={s.first}>
              <div className={`${s.image} ${s.image_first}`}>
                <Image url={props.recommendations[0].thumbnail}/>
              </div>
              <div className={s.text_wrapper}>
                <div className={s.label}>Previous article</div>
                <h3 className={s.title}>{props.recommendations[0].title}</h3>
              </div>
            </div>
          </a>
          <a href={`/article/${props.recommendations[1].slug}`} className={s.recommendation}>
            <div className={s.last}>
              <div className={s.text_wrapper}>
                <div className={s.label}>Next article</div>
                <h3 className={s.title}>{props.recommendations[1].title}</h3>
              </div>
              <div className={`${s.image} ${s.image_last}`}>
                <Image url={props.recommendations[1].thumbnail}/>
              </div>
            </div>
          </a>
        </div>
      </PillarBox>
    </div>
  )
);
