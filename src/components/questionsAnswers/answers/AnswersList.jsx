/* eslint-disable */
import React, {useState, useEffect} from 'react';
import { AnswerList, Thumbnail, PhotoList } from './Styles';
import { formatDate } from '../../common/helpers';

const Answer = ({id, answer}) => {
  const checkPhotoUrl = url =>
    /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/.test(url)

  const reportAnswer = () => {
    // PUT /qa/answers/:answer_id/report
  }

  const upVoteAnswer = () => {
    // PUT /qa/answers/:answer_id/helpful
  }

  return(
    <li key={id}>
      <h4>A: {answer.body}</h4>
      <div>
        by {answer.answerer_name}, {formatDate(answer.date)} | Helpful? <a href="#">Yes</a> ({answer.helpfulness}) | <a href="#">{answer.reported ? 'NO':'report'}</a>
      </div>
      <PhotoList>
        {answer.photos.length > 0 && answer.photos.map((photo, i)=>(
          checkPhotoUrl(photo) ?
            <Thumbnail key={i} photo={photo} /> : ''
        ))}
      </PhotoList>
    </li>
  )
}

const AnswersList = ({id, answers}) => {
  const [display, setDisplay] = useState(false);
  const [arr, setArr] = useState([]);

  return (
    <>
      { answers.length > 0 &&
      <div>
        <AnswerList>
          {[...answers.slice(0, display?4:2)].map(([id, answer])=>(
            <Answer key={id} id={id} answer={answer} />
            ))}
          {answers.length > 2 &&
            <li><button onClick={()=>setDisplay(!display)}>Show More Answers</button></li>
          }
        </AnswerList>
      </div>
      }
    </>
  )
}

export default AnswersList;