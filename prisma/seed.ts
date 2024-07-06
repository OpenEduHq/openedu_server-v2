// const { PrismaClient } = require('@prisma/client');
// import { title } from 'process';
// // import * as Quizzes from './data/quiz/index';

// const prisma = new PrismaClient();

// async function main() {
//   const GitQuiz = Quizzes.gitQuiz;
//   const accessibilityQuiz = Quizzes.accessibilityQuiz;
//   const agileQuiz = Quizzes.agileQuiz;
//   const cloudComputingQuiz = Quizzes.cloudComputingQuiz;
//   const cssQuiz = Quizzes.cssQuiz;
//   const devopsQuiz = Quizzes.devopsQuiz;
//   const generalCSQuiz = Quizzes.generalCSQuiz;
//   const htmlQuiz = Quizzes.htmlQuiz;
//   const informationTechnologyQuiz = Quizzes.informationTechnologyQuiz;
//   const javascriptQuiz = Quizzes.javascriptQuiz;
//   const linuxQuiz = Quizzes.linuxQuiz;
//   const pythonQuiz = Quizzes.pythonQuiz;
//   const qualityAssuranceQuiz = Quizzes.qualityAssuranceQuiz;
//   const regexQuiz = Quizzes.regexQuiz;
//   const securityQuiz = Quizzes.securityQuiz;
//   const sqlQuiz = Quizzes.sqlQuiz;

//   await prisma.Quiz.create({
//     data: {
//       title: GitQuiz.title,
//       questions: {
//         createMany: {
//           data: GitQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: accessibilityQuiz.title,
//       questions: {
//         createMany: {
//           data: accessibilityQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: agileQuiz.title,
//       questions: {
//         createMany: {
//           data: agileQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: cloudComputingQuiz.title,
//       questions: {
//         createMany: {
//           data: cloudComputingQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: cssQuiz.title,
//       questions: {
//         createMany: {
//           data: cssQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: devopsQuiz.title,
//       questions: {
//         createMany: {
//           data: devopsQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: generalCSQuiz.title,
//       questions: {
//         createMany: {
//           data: generalCSQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: htmlQuiz.title,
//       questions: {
//         createMany: {
//           data: htmlQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: informationTechnologyQuiz.title,
//       questions: {
//         createMany: {
//           data: informationTechnologyQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: javascriptQuiz.title,
//       questions: {
//         createMany: {
//           data: javascriptQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: linuxQuiz.title,
//       questions: {
//         createMany: {
//           data: linuxQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: pythonQuiz.title,
//       questions: {
//         createMany: {
//           data: pythonQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: qualityAssuranceQuiz.title,
//       questions: {
//         createMany: {
//           data: qualityAssuranceQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: regexQuiz.title,
//       questions: {
//         createMany: {
//           data: regexQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: securityQuiz.title,
//       questions: {
//         createMany: {
//           data: securityQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });

//   await prisma.Quiz.create({
//     data: {
//       title: sqlQuiz.title,
//       questions: {
//         createMany: {
//           data: sqlQuiz.questions.map((question) => {
//             return {
//               question: question.Question,
//               answers: question.Answer,
//               distractor1: question.Distractor1,
//               distractor2: question.Distractor2,
//               distractor3: question.Distractor3,
//               explanation: question.Explanation,
//               link: question.Link,
//             };
//           }),
//         },
//       },
//     },
//   });
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
