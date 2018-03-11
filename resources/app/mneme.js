function insertQuestion(questionObject) {
  var question = questionObject.question;
  var variety = questionObject.class;

  var variantOne = questionObject[1];
  var variantTwo = questionObject[2];
  var variantThree = questionObject[3];
  var variantFour = questionObject[4];

  var formElement = document.createElement("form");
  formElement.setAttribute("name", "question");

  var cardElement = document.createElement("div");
  cardElement.setAttribute("class", "card card-body");

  var cardTitleElement = document.createElement("h4");
  cardTitleElement.setAttribute("class", "card-title");
  cardTitleElement.innerHTML = question;
  cardElement.appendChild(cardTitleElement);

  var cardTextElement = document.createElement("p");
  cardTextElement.setAttribute("class", "card-text");

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
}

function createRow(questionObject, questionNumber) {
  var row = document.createElement("div");
  row.setAttribute("class", "form-check");

  var label = document.createElement("label");
  label.setAttribute("class", "label-text");

  var radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("name", "answer");
  radio.setAttribute("id", "radio_" + questionNumber);

  var span = document.createElement("span");
  span.setAttribute("class", "label-text");
  span.innerHTML = " " + questionObject[questionNumber];

  label.appendChild(radio);
  label.appendChild(span);
  row.appendChild(label);

  return row;
}
