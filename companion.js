const companionModal = document.getElementById('modal');
const companionTitle = document.getElementById('modalTitle');
const companionPrayer = document.getElementById('modalPrayer');
const companionTimer = document.querySelector('.timer');
let savedItems = [];

function companionOpen(title, message, label = 'Spend time in prayer') {
  companionTitle.textContent = title;
  companionPrayer.textContent = message;
  document.getElementById('completePrayer').innerHTML = `${label} <span>✓</span>`;
  companionTimer.style.display = title.includes('Gospel') || title.includes('Reflection') || title.includes('Saint') ? 'none' : 'flex';
  companionModal.classList.add('visible');
}

document.getElementById('readGospel').addEventListener('click', () => companionOpen(
  'Today’s Gospel',
  'Thomas said to Jesus, “My Lord and my God!” Jesus said to him, “Have you come to believe because you have seen me? Blessed are those who have not seen and have believed.”',
  'Receive the Gospel'
));
document.getElementById('openReflection').addEventListener('click', () => companionOpen(
  'Today’s Reflection',
  'Bring the places that feel uncertain to Jesus. Like Thomas, you need not hide your questions. Let them become a doorway into a more honest trust.',
  'Carry this with me'
));
document.getElementById('saintStory').addEventListener('click', () => companionOpen(
  'St. Thérèse',
  'Thérèse found holiness in the “little way”: doing ordinary acts with extraordinary love. Her quiet confidence teaches us that every small offering can become a prayer.',
  'Pray with St. Thérèse'
));

document.querySelectorAll('[data-save]').forEach(button => button.addEventListener('click', () => {
  const item = button.dataset.save;
  const isSaved = savedItems.includes(item);
  savedItems = isSaved ? savedItems.filter(saved => saved !== item) : [...savedItems, item];
  button.classList.toggle('saved', !isSaved);
  button.textContent = isSaved ? '♡' : '♥';
  document.getElementById('savedCount').textContent = savedItems.length;
}));

const audioButton = document.getElementById('audioPrayer');
audioButton.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) { companionOpen('Morning Offering', 'Your device does not support spoken prayer, but you can pray this offering here.'); return; }
  if (speechSynthesis.speaking) { speechSynthesis.cancel(); audioButton.classList.remove('playing'); audioButton.textContent = '▶'; return; }
  const voice = new SpeechSynthesisUtterance('O Jesus, through the Immaculate Heart of Mary, I offer you all my prayers, works, joys, and sufferings of this day.');
  voice.rate = .82; voice.pitch = .9;
  voice.onend = () => { audioButton.classList.remove('playing'); audioButton.textContent = '▶'; };
  speechSynthesis.speak(voice); audioButton.classList.add('playing'); audioButton.textContent = '■';
});

const reminderModal = document.getElementById('reminderModal');
document.getElementById('notificationButton').addEventListener('click', () => reminderModal.classList.add('visible'));
document.querySelector('[data-close-reminder]').addEventListener('click', () => reminderModal.classList.remove('visible'));
document.getElementById('setReminder').addEventListener('click', () => {
  reminderModal.classList.remove('visible');
  document.getElementById('notificationButton').querySelector('i').style.background = '#6d947c';
});
reminderModal.addEventListener('click', event => { if (event.target === reminderModal) reminderModal.classList.remove('visible'); });

const originalNextBead = document.getElementById('nextBead');
originalNextBead.addEventListener('click', () => { if (navigator.vibrate) navigator.vibrate(18); });
document.getElementById('openSaved').addEventListener('click', () => companionOpen('Your saved prayers', savedItems.length ? `You have saved: ${savedItems.join(', ')}.` : 'Save a Gospel, reflection, or prayer and it will appear here.', 'Close'));

document.getElementById('saveCurrentPrayer').addEventListener('click', event => {
  const item = companionTitle.textContent;
  const alreadySaved = savedItems.includes(item);
  savedItems = alreadySaved ? savedItems.filter(saved => saved !== item) : [...savedItems, item];
  event.currentTarget.classList.toggle('saved', !alreadySaved);
  event.currentTarget.textContent = alreadySaved ? '♡' : '♥';
  document.getElementById('savedCount').textContent = savedItems.length;
});
document.getElementById('bibleJourney').addEventListener('click', () => companionOpen('Bible Journey · Day 1', 'Today, begin with John 1:1–5. Before anything was made, the Word was with God. Read slowly. Notice the light that no darkness can overcome.', 'Begin reading'));
document.getElementById('heroStory').addEventListener('click', () => companionOpen('St. Maximilian Kolbe', 'In Auschwitz, St. Maximilian Kolbe offered his own life so that another man might live. His courageous choice still speaks of a love stronger than fear.', 'Pray for courage'));
