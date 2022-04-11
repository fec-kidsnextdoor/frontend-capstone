/* eslint-disable */
import React, {useState, useEffect} from 'react';
import { AnswerList } from './Styles';
import {AiOutlineClose} from 'react-icons/ai';
import Answer from './Answer.jsx';


const AnswersList = ({id, answers}) => {
  const [display, setDisplay] = useState(false);
  const [filterAnswers, setFilterAnswers] = useState([]);

  useEffect(()=>{
    if (filterAnswers.length === 0 && answers) {
      setFilterAnswers(answers);
    }
  }, [answers, filterAnswers]);

  const filterReported = answer_id => {
    let filtered = filterAnswers.filter(([id])=>id!==answer_id);
    console.log(filtered)
    setFilterAnswers(filtered);
  }

  return (
    <>
      { filterAnswers.length > 0 &&
      <div>
        <AnswerList>
          {[...filterAnswers.slice(0, display?4:2)].map(([id, answer])=>(
            <Answer
              key={id}
              id={id}
              answer={answer}
              filterReported={filterReported}
            />
            ))}
          {filterAnswers.length > 2 &&
            <li>
              <button
                onClick={()=>setDisplay(!display)}
              >Show More Answers</button>
            </li>
          }
        </AnswerList>
      </div>
      }
    </>
  )
}

export default AnswersList;