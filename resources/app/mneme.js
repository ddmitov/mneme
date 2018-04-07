function insertQuestion(questionObject) {
  var formElement = document.createElement('form');
  formElement.setAttribute('name', 'question');
  formElement.setAttribute('id', questionObject.number);

  var cardElement = document.createElement('div');
  cardElement.setAttribute('class', 'card card-body');

  var cardTitleElement = document.createElement('h4');
  cardTitleElement.setAttribute('class', 'card-title');
  cardTitleElement.innerHTML = questionObject.question;
  cardElement.appendChild(cardTitleElement);

  var cardTextElement = document.createElement('p');
  cardTextElement.setAttribute('class', 'card-text');

  var rowOne = createRow(questionObject, 1);
  cardTextElement.appendChild(rowOne);

  var rowTwo = createRow(questionObject, 2);
  cardTextElement.appendChild(rowTwo);

  var rowThree = createRow(questionObject, 3);
  cardTextElement.appendChild(rowThree);

  var rowFour = createRow(questionObject, 4);
  cardTextElement.appendChild(rowFour);

  cardElement.appendChild(cardTextElement);

  formElement.appendChild(cardElement);

  $('#question').empty();
  $('#question').append(formElement);

  var checkAnswerRow = document.createElement('div');
  checkAnswerRow.setAttribute('class', 'row justify-content-center');
  var checkAnswerButton = document.createElement('div');
  checkAnswerButton.setAttribute('class', 'btn btn-primary');
  checkAnswerButton.setAttribute('onclick', 'javascript:checkAnswer();');
  checkAnswerButton.innerHTML = 'Провери';
  checkAnswerRow.appendChild(checkAnswerButton);

  var nextQuestionRow = document.createElement('div');
  nextQuestionRow.setAttribute('class', 'row justify-content-center');
  var nextQuestionButton = document.createElement('div');
  nextQuestionButton.setAttribute('class', 'btn btn-primary');
  nextQuestionButton.setAttribute('onclick', 'javascript:getNextQuestion();');
  nextQuestionButton.innerHTML = 'Следващ';
  nextQuestionRow.appendChild(nextQuestionButton);

  $('#buttons').empty();
  $('#buttons').append(checkAnswerRow);
  $('#buttons').append(nextQuestionRow);
}

function createRow(questionObject, questionNumber) {
  var row = document.createElement('div');
  row.setAttribute('class', 'form-check');

  var label = document.createElement('label');
  label.setAttribute('class', 'label-text');

  var radio = document.createElement('input');
  radio.setAttribute('type', 'radio');
  radio.setAttribute('name', 'answer');
  radio.setAttribute('id', questionNumber);

  var span = document.createElement('span');
  span.setAttribute('class', 'label-text');
  span.innerHTML = ' ' + questionObject[questionNumber];

  label.appendChild(radio);
  label.appendChild(span);
  row.appendChild(label);

  return row;
}

function checkAnswer() {
  var selectedAnswer;

  var radioButtonsArray = [];
  radioButtonsArray = document.querySelectorAll('input[type=radio]');

  for (index = 0; index < radioButtonsArray.length; index++) {
    if (radioButtonsArray[index].checked === true) {
      selectedAnswer = radioButtonsArray[index].id;
    }
  }

  if (selectedAnswer !== undefined) {
    var questionForm = document.querySelector('form[name=question]');
    var questionNumber = questionForm.id;

    $.ajax({
      url: '/check_answer',
      dataType: 'text',
      data: {'number': questionNumber},
      cache: false,
      type: 'GET',
      success: function(data) {
        var questionObject = JSON.parse(data);
        var correctAnswer = questionObject.answer;

        if (selectedAnswer === correctAnswer) {
          console.log('Correct answer: ' + selectedAnswer);
        } else {
          console.log('Wrong answer: ' + selectedAnswer);
        }
      }
    });
  }

  if (selectedAnswer === undefined) {
    console.log('No answer is selected.');
  }
}
