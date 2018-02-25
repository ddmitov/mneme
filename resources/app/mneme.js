function insertQuestion(questionObject) {
  var question = questionObject.question;
  var variety = questionObject.class;

  var variantOne = questionObject.a;
  var variantTwo = questionObject.b;
  var variantThree = questionObject.c;
  var variantFour = questionObject.d;

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


  var rowOne = document.createElement("div");
  rowOne.setAttribute("class", "form-check");

  var labelOne = document.createElement("label");
  labelOne.setAttribute("class", "label-text");

  var radioOne = document.createElement("input");
  radioOne.setAttribute("type", "radio");
  radioOne.setAttribute("name", "answer");
  radioOne.setAttribute("id", "radioOne");

  var spanOne = document.createElement("span");
  spanOne.setAttribute("class", "label-text");
  spanOne.innerHTML = " " + variantOne;

  labelOne.appendChild(radioOne);
  labelOne.appendChild(spanOne);
  rowOne.appendChild(labelOne);
  cardTextElement.appendChild(rowOne);


  var rowTwo = document.createElement("div");
  rowTwo.setAttribute("class", "form-check");

  var labelTwo = document.createElement("label");
  labelTwo.setAttribute("class", "label-text");

  var radioTwo = document.createElement("input");
  radioTwo.setAttribute("type", "radio");
  radioTwo.setAttribute("name", "answer");
  radioTwo.setAttribute("id", "radioTwo");

  var spanTwo = document.createElement("span");
  spanTwo.setAttribute("class", "label-text");
  spanTwo.innerHTML = " " + variantTwo;

  labelTwo.appendChild(radioTwo);
  labelTwo.appendChild(spanTwo);
  rowTwo.appendChild(labelTwo);
  cardTextElement.appendChild(rowTwo);


  var rowThree = document.createElement("div");
  rowThree.setAttribute("class", "form-check");

  var labelThree = document.createElement("label");
  labelThree.setAttribute("class", "label-text");

  var radioThree = document.createElement("input");
  radioThree.setAttribute("type", "radio");
  radioThree.setAttribute("name", "answer");
  radioThree.setAttribute("id", "radioThree");

  var spanThree = document.createElement("span");
  spanThree.setAttribute("class", "label-text");
  spanThree.innerHTML = " " + variantThree;

  labelThree.appendChild(radioThree);
  labelThree.appendChild(spanThree);
  rowThree.appendChild(labelThree);
  cardTextElement.appendChild(rowThree);


  var rowFour = document.createElement("div");
  rowFour.setAttribute("class", "form-check");

  var labelFour = document.createElement("label");
  labelFour.setAttribute("class", "label-text");

  var radioFour = document.createElement("input");
  radioFour.setAttribute("type", "radio");
  radioFour.setAttribute("name", "answer");
  radioFour.setAttribute("id", "radioFour");

  var spanFour = document.createElement("span");
  spanFour.setAttribute("class", "label-text");
  spanFour.innerHTML = " " + variantFour;

  labelFour.appendChild(radioFour);
  labelFour.appendChild(spanFour);
  rowFour.appendChild(labelFour);
  cardTextElement.appendChild(rowFour);


  cardElement.appendChild(cardTextElement);
  formElement.appendChild(cardElement);

  $('#question').empty();
  $('#question').append(formElement);
}
