const characterNames = [
  'Jaime Lannister',
  'Tyrion Lannister',
  'Bran Stark',
  'Daenerys Targaryen',
  'Petyr Baelish',
  'Aerys II Targaryen',
  'Jon Snow',
  'Joffrey Baratheon',
  'Eddard \'Ned\' Stark',
  'Cersei Lannister',
  'Robert Baratheon'
];

let count = 0;

const newQuoteBtn = document.querySelector('#new-quote-btn');
const quoteText = document.querySelector('#quote-text');
const characterName = document.querySelector('#character-name');
const options = document.querySelectorAll('.option');

function generateQuote() {
  fetch('https://api.gameofthronesquotes.xyz/v1/random')
    .then(response => response.json())
    .then(data => {
      quoteText.innerText = data.sentence;
      characterName.innerText = data.character.name;
      const correctOption = Math.floor(Math.random() * 4);
      let optionIndex = 0;
      for (let i = 0; i < options.length; i++) {
        if (i === correctOption) {
          options[i].innerText = data.character.name;
        } else {
          options[i].innerText = characterNames[optionIndex];
          optionIndex++;
        }
      }
    });
}

function showQuiz() {
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove('hide');
  }
  characterName.classList.add('hide');
  quoteText.innerText = 'Who said this quote?';
}

function showResult(isCorrect) {
  const resultText = document.querySelector('#result-text');
  const resultLink = document.querySelector('#result-link');
  const resultBtn = document.querySelector('#result-btn');
  for (let i = 0; i < options.length; i++) {
    options[i].classList.add('hide');
  }
  characterName.classList.remove('hide');
  if (isCorrect) {
    resultText.innerText = 'Correct! Would you like to learn SQL from scratch in an interactive way? Check out this SQL Game of Thrones course -';
    resultLink.href = 'https://resagratia.com/learn/sql';
  } else {
    resultText.innerText = 'Oh no! That\'s not right. The good news is that you can now learn SQL from scratch in an interactive way using data from the Game of Thrones world. Ready to delve in? Check this out -';
    resultLink.href = 'https://resagratia.com/learn/sql';
  }
  resultBtn.innerText = 'Get Another Quote';
  resultBtn.addEventListener('click', () => {
    resultText.innerText = '';
    resultLink.href = '#';
    resultBtn.innerText = '';
    generateQuote();
  });
}

newQuoteBtn.addEventListener('click', () => {
  count++;
  if (count % 2 === 0) {
    showQuiz();
  } else {
    generateQuote();
  }
});

options.forEach(option => {
  option.addEventListener('click', () => {
    if (option.innerText === characterName.innerText) {
      showResult(true);
    } else {
      showResult(false);
    }
  });
});
