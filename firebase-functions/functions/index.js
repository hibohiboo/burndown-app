const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.validBoardPass = functions.region('asia-northeast1').https.onRequest((request, response) => {
  if(request.method !== 'POST' || !request.body || !request.body.boardId || !request.body.pass) {
    response.send(false);
  }
  const board_id = `${functions.config().api.board_id}`;
  const pass = `${functions.config().api.pass}`;
  response.send(board_id === request.body.boardId && pass === request.body.pass);
});
