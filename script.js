let quoteContainer = document.querySelector('.quote-container');
let newQuoteButton = document.querySelector('#new-quote-btn');
let count = 0;
let characters = ['Jaime Lannister', 'Tyrion Lannister', 'Bran Stark', 'Daenerys Targaryen', 'Petyr Baelish', 'Aerys II Targaryen', 'Jon Snow', 'Joffrey Baratheon', 'Eddard \'Ned\' Stark', 'Cersei Lannister', 'Robert Baratheon'];

function getQuote() {
  fetch('https://api.gameofthronesquotes.xyz/v1/random')
    .then(response => response.json())
    .then(data => {
      let quote = data.sentence;
      let character = data.character.name;
      let options = [];

      for (let i = 0; i < 3; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        let randomCharacter = characters[randomIndex];
        if (randomCharacter !== character) {
          options.push(randomCharacter);
        } else {
          i--;
        }
      }

      options.push(character);
      options = shuffle(options);

      let quiz = '';
      if (count % 2 === 0) {
        quiz = `Who said: <span class="quote">${quote}</span><br><br>`;
        for (let i = 0; i < options.length; i++) {
          quiz += `<button class="option" value="${options[i]}">${options[i]}</button>`;
        }
        quoteContainer.innerHTML = quiz;
        let optionsButton = document.querySelectorAll('.option');
        for (let i = 0; i < optionsButton.length; i++) {
          optionsButton[i].addEventListener('click', checkAnswer);
        }
      } else {
        quoteContainer.innerHTML = `<p class="quote">${quote}</p><br><span class="character">- ${character}</span>`;
      }
    })
    .catch(error => console.error(error));
}

function checkAnswer() {
  let userAnswer = this.value;
  let correctAnswer = document.querySelector('.character').textContent.slice(2);
  if (userAnswer === correctAnswer) {
    quoteContainer.innerHTML = 'Correct! Would you like to learn SQL from scratch in an interactive way? Check out this SQL Game of Thrones course - https://resagratia.com/learn/sql<br><br>';
  } else {
    quoteContainer.innerHTML = 'Oh no! That\'s not right. The good news is that you can now learn SQL from scratch in an interactive way using data from the Game of Thrones world. Ready to delve in? Check this out - https://resagratia.com/learn/sql<br><br>';
  }
  quoteContainer.innerHTML += '<button id="new-quote-btn" class="button">Another Quote</button>';
  newQuoteButton = document.querySelector('#new-quote-btn');
  newQuoteButton.addEventListener('click', () => {
    count++;
    getQuote();
  });
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

getQuote();
newQuoteButton.addEventListener('click', () => {
  count++;
  getQuote();
});
