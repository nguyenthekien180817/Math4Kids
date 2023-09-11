import React from "react";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";

function MultiChoicePage() {
  const [backend, setBackend] = useState(null);
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: "http://localhost:4000/multi-test/show-multi-test",
  //   })
  //     .then((response) => {
  //       setBackend(response.tests);
  //     })
  //     .then(console.log(backend))
  //     .catch((err) => {});
  // }, []);

  useEffect(() => {
    fetch("http://localhost:4000/multi-test/show-multi-test")
      .then((response) => response.json())
      .then((data) => {
        setBackend(data.tests);
      })
      .then(console.log(backend))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {backend != null ? (
        backend.map((test, i) => {
          return (
            <div>
              <p>Được tạo bởi {test.author}</p>
              <p>Vào ngày: {test.createdAt}</p>
            </div>
          );
        })
      ) : (
        <h1>Lỗi tải backend, hãy thử reload trang</h1>
      )}
    </div>
  );
}
export default MultiChoicePage;

/*--------------------------- Uneeded Scrap  -----------------------------*/
// function MultiChoicePage() {
//   const [disable, setDisable] = useState(false);
//   const myQuestions = [
//     {
//       question: "Javascript is _________ language.",
//       answers: {
//         a: "Programming",
//         b: "Application",
//         c: "None of These",
//         d: "Scripting",
//       },
//       correctAnswer: "Programming",
//     },
//     {
//       question:
//         "Which of the following is a valid type of function javascript supports?",
//       answers: {
//         a: "named function",
//         b: "anonymous function",
//         c: "both of the above",
//         d: "none of the above",
//       },
//       correctAnswer: "named function",
//     },
//     {
//       question:
//         "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
//       answers: {
//         a: "getIndex()",
//         b: "location()",
//         c: "indexOf()",
//         d: "getLocation()",
//       },
//       correctAnswer: "indexOf()",
//     },
//     {
//       question: "Which one of the following is valid data type of JavaScript",
//       answers: {
//         a: "number",
//         b: "void",
//         c: "boolean",
//         d: "a and c",
//       },
//       correctAnswer: "number",
//     },
//   ];

//   const [score, setScore] = useState(0);
//   let answersArray = [];
//   for (let i = 0; i < myQuestions.length; i++) {
//     answersArray[i] = 0;
//   }

//   console.log(answersArray);

//   let handleRadioSelect = (e) => {
//     answersArray[e.target.name] = e.target.value;
//     console.log(answersArray);
//   };

//   let handleSubmitScore = (e) => {
//     setDisable(true);
//     let count = 0;
//     for (let i = 0; i < myQuestions.length; i++) {
//       if (myQuestions[i].correctAnswer == answersArray[i]) {
//         count++;
//       }
//     }
//     setScore(count);
//   };

//   return (
//     <div>
//       {/* <form> */}
//       {myQuestions.map((question, index) => {
//         return (
//           <div>
//             <br />
//             <p>{question.question}</p>
//             {/* Question A */}
//             <input
//               disabled={disable}
//               type="radio"
//               name={`${index}`}
//               value={question.answers.a}
//               id={question.answers.a}
//               onClick={(e) => handleRadioSelect(e)}
//             ></input>
//             <label htmlFor={question.answers.a}>A: {question.answers.a}</label>
//             <br />
//             {/* Question B */}
//             <input
//               disabled={disable}
//               type="radio"
//               name={`${index}`}
//               value={question.answers.b}
//               id={question.answers.b}
//               onClick={(e) => handleRadioSelect(e)}
//             ></input>
//             <label htmlFor={question.answers.b}>B: {question.answers.b}</label>
//             <br />
//             {/* Question C */}
//             <input
//               disabled={disable}
//               type="radio"
//               name={`${index}`}
//               value={question.answers.c}
//               id={question.answers.c}
//               onClick={(e) => handleRadioSelect(e)}
//             ></input>
//             <label htmlFor={question.answers.c}>C: {question.answers.c}</label>
//             <br />
//             {/* Question D */}
//             <input
//               disabled={disable}
//               type="radio"
//               name={`${index}`}
//               value={question.answers.d}
//               id={question.answers.d}
//               onClick={(e) => handleRadioSelect(e)}
//             ></input>
//             <label htmlFor={question.answers.d}>D: {question.answers.d}</label>
//             <br />
//           </div>
//         );
//       })}
//       {disable ? (
//         <p style={{ color: "red" }}>
//           You scored {score} out of {answersArray.length}
//         </p>
//       ) : (
//         <p></p>
//       )}
//       <button disabled={disable} onClick={() => handleSubmitScore()}>
//         Submit
//       </button>
//       {/* </form> */}
//     </div>
//   );
// }

// export default MultiChoicePage;
