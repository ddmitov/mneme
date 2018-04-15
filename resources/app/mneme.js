var correctAnswersGlobalNumber = 0;
var wrongAnswersGlobalNumber = 0;

function getNextQuestion() {
  var questionForm = document.querySelector('form[name=question]');
  var nextQuestionNumber;

  if (questionForm === null) {
    nextQuestionNumber = 1;
  } else {
    nextQuestionNumber = parseInt(questionForm.id) + 1;
  }

  $.ajax({
    url: '/get_question',
    dataType: 'text',
    data: {'number': nextQuestionNumber},
    cache: false,
    type: 'GET',
    success: function(data) {
      if (data.length > 0) {
        insertQuestion(JSON.parse(data));
      } else {
        $('#next-question-row').empty();

        var noMoreQuestionMessage = document.createElement('p');
        noMoreQuestionMessage.setAttribute('class', 'label-text text-white bg-danger rounded');
        noMoreQuestionMessage.setAttribute('style', 'padding: 10px;');
        noMoreQuestionMessage.innerHTML = 'Въпросите са изчерпани!';

        $('#next-question-row').append(noMoreQuestionMessage);
      }
    }
  });
}

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
  checkAnswerRow.setAttribute('id', 'check-answer-row');
  checkAnswerRow.setAttribute('class', 'row justify-content-center');
  var checkAnswerButton = document.createElement('div');
  checkAnswerButton.setAttribute('class', 'btn btn-primary');
  checkAnswerButton.setAttribute('onclick', 'javascript:checkAnswer();');
  checkAnswerButton.innerHTML = 'Провери';
  checkAnswerRow.appendChild(checkAnswerButton);

  var nextQuestionRow = document.createElement('div');
  nextQuestionRow.setAttribute('id', 'next-question-row');
  nextQuestionRow.setAttribute('class', 'row justify-content-center');
  var nextQuestionButton = document.createElement('div');
  nextQuestionButton.setAttribute('class', 'btn btn-primary');
  nextQuestionButton.setAttribute('onclick', 'javascript:getNextQuestion();');
  nextQuestionButton.innerHTML = 'Следващ';
  nextQuestionRow.appendChild(nextQuestionButton);

  var answersStatistics = document.createElement('div');
  answersStatistics.setAttribute('id', 'answers-statistics');
  answersStatistics.setAttribute('class', 'row justify-content-center');
  answersStatistics.innerHTML = getAnswerStatistics();

  $('#buttons').empty();
  $('#buttons').append(checkAnswerRow);
  $('#buttons').append(nextQuestionRow);
  $('#buttons').append(answersStatistics);
}

function createRow(questionObject, questionNumber) {
  var row = document.createElement('div');
  row.setAttribute('class', 'form-check');

  var label = document.createElement('label');
  label.setAttribute('class', 'label-text');
  label.setAttribute('id', 'question-' + questionNumber);

  var radio = document.createElement('input');
  radio.setAttribute('type', 'radio');
  radio.setAttribute('name', 'answer');
  radio.setAttribute('id', questionNumber);

  var span = document.createElement('span');
  span.setAttribute('class', 'label-text');
  span.setAttribute('style', 'padding: 10px;');
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

    radioButtonsArray[index].checked = false;
    radioButtonsArray[index].disabled = true;
  }

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

      if (selectedAnswer !== undefined && selectedAnswer !== correctAnswer) {
        var selectedAnswerText =
          document.getElementById('question-' + selectedAnswer);
        selectedAnswerText.setAttribute('class', 'text-white bg-danger rounded');

        wrongAnswersGlobalNumber++;
        var answersStatisticsText = getAnswerStatistics();
        var answersStatisticsElement = document.getElementById('answers-statistics');
        answersStatisticsElement.innerHTML = answersStatisticsText;
      }

      if (selectedAnswer !== undefined && selectedAnswer === correctAnswer) {
        correctAnswersGlobalNumber++;
        var answersStatisticsText = getAnswerStatistics();
        var answersStatisticsElement = document.getElementById('answers-statistics');
        answersStatisticsElement.innerHTML = answersStatisticsText;
      }

      var correctAnswerText =
        document.getElementById('question-' + correctAnswer);
      correctAnswerText.setAttribute('class', 'text-white bg-success rounded');

      $('#check-answer-row').remove();
    }
  });
}

function getAnswerStatistics() {
  var correctAnswersNumber = correctAnswersGlobalNumber;
  var wrongAnswersNumber = wrongAnswersGlobalNumber;
  var correctAnswersLabel;
  var wrongAnswersLabel;
  var divisor = ' / ';

  if (correctAnswersNumber == 0) {
    correctAnswersNumber = '';
    correctAnswersLabel = '';
    divisor = '';
  }

  if (wrongAnswersNumber == 0) {
    wrongAnswersNumber = '';
    wrongAnswersLabel = '';
    divisor = '';
  }

  if (correctAnswersNumber == 1) {
    correctAnswersLabel = ' верен';
  }

  if (correctAnswersNumber > 1) {
    correctAnswersLabel = ' верни';
  }

  if (wrongAnswersNumber == 1) {
    wrongAnswersLabel = ' грешен';
  }

  if (wrongAnswersNumber > 1) {
    wrongAnswersLabel = ' грешни';
  }

  var text =
    correctAnswersNumber + correctAnswersLabel + divisor +
    wrongAnswersNumber + wrongAnswersLabel;

  return text;
}
