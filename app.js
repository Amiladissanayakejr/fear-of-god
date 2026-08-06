const screens = document.querySelectorAll('.screen');
const navItems = document.querySelectorAll('.nav-item');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalPrayer = document.getElementById('modalPrayer');
const prayerText = {
  'Morning Offering': 'O Jesus, through the Immaculate Heart of Mary, I offer you all my prayers, works, joys, and sufferings of this day.',
  'The Angelus': 'The Angel of the Lord declared unto Mary. And she conceived of the Holy Spirit. Hail Mary, full of grace, the Lord is with thee.',
  'Prayer for Peace': 'Lord, make me an instrument of your peace. Where there is hatred, let me sow love; where there is injury, pardon.',
  'Prayer of Gratitude': 'Loving God, thank you for the gift of this day, for the breath in my lungs, and for every grace seen and unseen.',
  'Night Prayer': 'Into your hands, Lord, I commend my spirit. Keep me safe through the night and wake me to the light of a new day.'
};
function showScreen(id) { screens.forEach(s => s.classList.toggle('active', s.id === id)); navItems.forEach(n => n.classList.toggle('active', n.dataset.target === id)); window.scrollTo({top:0,behavior:'smooth'}); }
navItems.forEach(item => item.addEventListener('click', () => showScreen(item.dataset.target)));
document.querySelectorAll('[data-target]').forEach(el => { if (!el.classList.contains('nav-item')) el.addEventListener('click', () => showScreen(el.dataset.target)); });
function openPrayer(name='Morning Offering') { modalTitle.textContent=name; modalPrayer.textContent=prayerText[name] || prayerText['Morning Offering']; modal.classList.add('visible'); }
document.getElementById('prayNow').addEventListener('click', ()=>openPrayer());
document.getElementById('openPrayer').addEventListener('click', ()=>openPrayer());
document.querySelectorAll('.prayer-item').forEach(el=>el.addEventListener('click',()=>openPrayer(el.dataset.prayer)));
document.getElementById('closeModal').addEventListener('click',()=>modal.classList.remove('visible'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('visible')});
let seconds=180, interval; const timerText=document.getElementById('timerText'), timerButton=document.getElementById('timerButton');
timerButton.addEventListener('click',()=>{if(interval){clearInterval(interval);interval=null;timerButton.textContent='Resume timer';return} timerButton.textContent='Pause timer'; interval=setInterval(()=>{if(seconds>0){seconds--;timerText.textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`}else{clearInterval(interval);interval=null;timerButton.textContent='Time in prayer';}},1000)});
document.getElementById('completePrayer').addEventListener('click',()=>{modal.classList.remove('visible'); const count=document.getElementById('streakCount'); count.textContent=Number(count.textContent)+1; document.getElementById('prayerTotal').textContent=Number(document.getElementById('prayerTotal').textContent)+1;});
const verses=[['Be still, and know that I am God.','PSALM 46:10'],['The Lord is near to all who call upon him.','PSALM 145:18'],['Rejoice in hope, be patient in tribulation, be constant in prayer.','ROMANS 12:12'],['My grace is sufficient for you.','2 CORINTHIANS 12:9']];let v=1;document.getElementById('newVerse').addEventListener('click',()=>{v=(v+1)%verses.length;document.getElementById('verseText').textContent=verses[v][0];document.getElementById('verseRef').textContent=verses[v][1]});
let bead=1;document.getElementById('nextBead').addEventListener('click',()=>{bead=bead===10?1:bead+1;document.getElementById('beadNumber').textContent=bead;document.querySelector('.decade small').textContent=`Bead ${bead} of 10`; if(bead===1)document.getElementById('nextBead').textContent='Next ›'; if(bead===10)document.getElementById('nextBead').textContent='Finish ✦';});
