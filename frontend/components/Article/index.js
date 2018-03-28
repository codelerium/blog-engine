import React from 'react';
import { Paragraph } from '../Paragraph/index';
import { Title } from '../Title/index';
import { BlockQuote } from '../Blockquote/index';
import Code from '../Code/index';
import { Image } from '../Image/index';
import s from './styles.css';
import {PillarBox} from "../PillarBox/index";

export const Article = props => (
  <div style={s.ARTICLE}>
    <PillarBox>
      <Title text={props.data.title}/>
      <Paragraph
        title={'From gaming to coding'}
        text={'It all started when I found myself lost in the gaming world. Most days, I would spend the majority of my time playing Call of Duty, Gears of War, Runescape, and whatever else I could get my hands on. All of my friends would meet up on these games daily to play, and we slowly shifted from being outside most of the day, to playing online.'}
      />
      <Paragraph text={'Not too long after I realized the power of Java, I found a book online called Teach Yourself Java in 21 days. I downloaded Eclipse and got started. The book fascinated me, and although I was still an avid gamer, I found myself growing more fond of my new hobby everyday.'} />
      <BlockQuote
        text={'After two years, we stopped working on Runn, and focused on other opportunities. In addition to my own ventures, I’ve engineered at some great companies: Nexient, Ford, and Nima Labs.'}
      />
      <Paragraph text={'I’m now in Santa Monica, working on SafePGP — a cryptography tool, as well as a crypto trading app. I’ve been blessed to have the opportunity to do my favorite childhood hobby as a profession, and I couldn’t imagine doing anything else.'} />
      <Code snippet={'var code = "Hello blog!"'} />
      <Paragraph text={'I’m now in Santa Monica, working on SafePGP — a cryptography tool, as well as a crypto trading app. I’ve been blessed to have the opportunity to do my favorite childhood hobby as a profession, and I couldn’t imagine doing anything else.'} />
      <Image url={'http://localhost:8080/images/test.png'} caption={'1.1 Test image!'} extended/>
      <Paragraph text={'I’m now in Santa Monica, working on SafePGP — a cryptography tool, as well as a crypto trading app. I’ve been blessed to have the opportunity to do my favorite childhood hobby as a profession, and I couldn’t imagine doing anything else.'} />
      <Image url={'http://localhost:8080/images/test2.png'} caption={'1.2 Test 2 image!'} extended/>
      <Code snippet={
`for (var i = 0; i < 10; i++) {
  console.log(i);
}`
      }/>
      <Paragraph text={'I’m now in Santa Monica, working on SafePGP — a cryptography tool, as well as a crypto trading app. I’ve been blessed to have the opportunity to do my favorite childhood hobby as a profession, and I couldn’t imagine doing anything else.'} />
    </PillarBox>
  </div>
);
