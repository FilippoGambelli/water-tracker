const CONFIG = {
    dailyGoal: 5,
    daysForLetter: 1,
    minInterval: 1000 * 30,
};
const LOVE_LETTERS = [
    {
        title: "Per Noi 💌",
        content: "Piccola mia, so che probabilmente a San Valentino non riusciremo a vederci e questa cosa un po' mi pesa. Proprio per questo ho pensato a questo regalino, così da tenerti compagnia nei giorni che mancano e farti sentire quanto ti penso. Dimmi la verità: come sta andando? Stai fregando oppure no? Birichina!! 💕"
    },
    {
        title: "Sempre Nei Miei Pensieri 💕",
        content: "Orsacchiotta, ti penso molto più spesso di quanto immagini, davvero. Ogni volta che passiamo del tempo insieme mi innamoro sempre di più e mi rende tanto felice sentire che ci stiamo capendo meglio, che riusciamo a parlarci e anche a litigare meno. Stare così, insieme, mi fa sentire davvero tanto fortunato. Non vedo veramente l'ora di andare a convivere insieme, vorrei stare con te ogni singolo giorno. Ti amo! 🤍"
    },
    {
        title: "Orgoglioso di Te ✨",
        content: "Principessa, sono davvero contento di come stai affrontando tesi e tirocinio. Si vede tantissimo quanto sei cresciuta e quanto hai imparato a stare nel lavoro e vederti così appassionata a quello che studi è una cosa bellissima. A proposito, come va con il bere? Hai bisogno di un aiutino? In ogni caso spero che ti stia aiutano a bere un pochettino di più. Ti amo! 🤍"
    },
    {
        title: "Io Ci Sono 💞",
        content: "Amore mio, so che ci sono periodi in cui non riusciamo a vederci come vorremmo, ma non è perché non ci vogliamo: siamo solo sommersi dalle cose da fare. Voglio che tu sappia che per qualsiasi cosa io ci sono, sempre, accanto a te. Ti voglio un bene immenso. Ormai manca poco alla sorpresa finaleeeeeee!!!!! 💕"
    },
    {
        title: "Buon San Valentino 🤍",
        content: `Orco muscoloso 🤍,
Nelle ultime settimane ho ripensato tanto a questo periodo e non ho potuto fare a meno di notare lo spirito e la forza che metti in tutto quello che fai, anche quando le cose non sono semplici. Vedo chiaramente quanto tu sia cresciuta rispetto a qualche anno fa: oggi ti abbatti con molta meno facilità e, piano piano, stai imparando a pensare sempre di più per te stessa, senza farti giudicare o ferire dalla prima cosa che gli altri dicono. Questa tua forza silenziosa mi colpisce ogni giorno. Forse non riesco sempre a fartelo percepire come vorrei, ma sono davvero e genuinamente contento del percorso che stai facendo, e spero con tutto il cuore che questo sia solo l'inizio.
Nel nostro rapporto sento che siamo cresciuti tanto, soprattutto nella comunicazione e nella comprensione reciproca. Riusciamo a parlare meglio, anche quando la pensiamo in modo diverso, senza cercare di convincerci a vicenda o di arrabbiarci, ma semplicemente confrontandoci. E poi mi piace tantissimo vedere come riesci a stare al gioco anche con le battute, senza però perdere la profondità quando servono discorsi seri: è un equilibrio bellissimo, e lo stiamo costruendo insieme.
So che in questo periodo, come purtroppo è già successo in passato, riusciamo a vederci poco a causa di impegni che non possiamo evitare. Capisco che a volte tu possa pensare che io non abbia voglia di vederti, ma voglio che tu sappia che non è assolutamente così. Ti penso davvero sempre, anche quando non riesco a fartelo percepire come vorrei perché sono sommerso dallo studio, dalle chiamate e dalle mille cose da fare. Se a volte i messaggini sono pochi, sappi che non è mancanza di amore, ma solo il tentativo — un po’ goffo — di fare il massimo per tutto e per tutti.
Quando non riusciamo a vederci, mi manchi tu. Sembra banale, ma è proprio così: mi manca il tuo modo di fare, di scherzare, di parlare, di raccontarmi la tua giornata e vederti fiera di quello che stai facendo. È davvero bello percepire quanto ti stia piacendo quello che stai studiando e quanto tu sia coinvolta nella preparazione della tesi.
Guardando avanti, senza fare grandi promesse, io mi immagino semplicemente noi due insieme. Non vedo l'ora di convivere, di passare più tempo insieme, cucinare, guardare la TV sul divano, ridere e scherzare. Sapere che a casa ho una persona che mi ama, prepararti le cose quando vai a lavoro, aspettarti anche quando fai tardi… sì, è proprio questo che voglio, ed è questo che mi rende felice.
E poi questa piccola sfida dell'acqua: spero che ti abbia fatto sorridere, che ti sia divertita e che, anche solo un po', ti abbia aiutata a bere di più. Non è solo acqua, è un modo per ricordarti di prenderti cura di te, perché te lo meriti davvero.
Piccola mia, ricordati sempre che io ci sono.
Ti amo per quello che sei, per quello che stai diventando e per tutto quello che costruiremo insieme, un sorso alla volta, una giornata alla volta 🤍`
    }
];
let appState = {
    currentWater: 0,
    todayDate: new Date().toDateString(),
    streak: 0,
    successfulDays: 0,
    unlockedLetters: [],
    lastDrinkTime: Date.now(),
    history: []
};
function init() {
    loadState();
    checkNewDay();
    updateUI();
    createMilestones();
    startReminderTimer();
    createFloatingHearts();
}
function createFloatingHearts() {
    const container = document.getElementById('background-hearts');
    const hearts = ['💕', '💖', '💗', '💓', '💞', '💝', '🌹', '💘'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
        heart.style.animationDuration = (15 + Math.random() * 20) + 's';
        heart.style.animationDelay = (Math.random() * -20) + 's';
        container.appendChild(heart);
    }
}
function loadState() {
    const saved = localStorage.getItem('waterLoveTracker');
    if (saved) {
        appState = { ...appState, ...JSON.parse(saved) };
    }
}
function saveState() {
    localStorage.setItem('waterLoveTracker', JSON.stringify(appState));
}
function checkNewDay() {
    const today = new Date().toDateString();
    if (appState.todayDate !== today) {
        if (appState.currentWater >= CONFIG.dailyGoal) {
            appState.successfulDays++;
            appState.streak++;
        } else {
            appState.streak = 0;
        }
        appState.currentWater = 0;
        appState.todayDate = today;
        checkForNewLetter();
        saveState();
    }
}
function addWater() {
    const now = Date.now();
    const timeSinceLast = now - appState.lastDrinkTime;
    if (appState.currentWater > 0 && timeSinceLast < CONFIG.minInterval) {
        showCheatLetter();
        return;
    }
    if (appState.currentWater >= CONFIG.dailyGoal) {
        showGoalReachedMessage();
        return;
    }
    if (appState.currentWater < CONFIG.dailyGoal) {
        appState.currentWater++;
        appState.lastDrinkTime = now;
        if (appState.currentWater === CONFIG.dailyGoal) {
            celebrate();
            checkForNewLetter();
        } else {
            // Show cute popup for intermediate steps
            showEncouragement();
        }
        saveState();
        updateUI();
    }
}
function showGoalReachedMessage() {
    document.getElementById('letterTitle').textContent = "Pazienza, Tesoro! 🌸";
    document.getElementById('letterContent').textContent = "Sei stata bravissima oggi! ✨ Non avere fretta di finire tutto subito... Goditi il viaggio e torna domani per un altro passo. Ti amo! 💕";
    document.getElementById('letterModal').classList.add('active');
}
function updateUI() {
    document.getElementById('currentWater').textContent = appState.currentWater;
    document.getElementById('goalWater').textContent = CONFIG.dailyGoal;
    document.getElementById('todayGlasses').textContent = appState.currentWater;
    document.getElementById('streakDays').textContent = appState.streak;
    const progress = (appState.currentWater / CONFIG.dailyGoal) * 100;
    document.getElementById('progressBar').style.width = Math.min(progress, 100) + '%';
}
const LOCKED_MESSAGES = [
    "Shhh... è una sorpresa! 🤫 Ogni cosa a suo tempo, amore mio! Goditi il viaggio... 💖",
    "Non avere fretta! ✨ Il bello dell'attesa è il desiderio. Continua così!",
    "Curiosa eh? 😜 Devi bere ancora un po' per scoprire cosa c'è scritto qui!",
    "È un segreto per il futuro! 🌸 Continua a prenderti cura di te e lo scoprirai.",
    "Un passo alla volta... 👣 Ogni goccia conta verso questo tesoro!"
];

const CUTE_PHRASES = [
    "Meno uno! 💕",
    "Brava amore, continua così! 🌸",
    "Stai andando alla grande! ✨",
    "Idratazione in corso... 💧",
    "Ti penso sempre! ❤️",
    "Sei la mia forza! 💪",
    "Un sorso alla volta! 🌊",
    "Bellissima e idratata! 💖",
    "Orgogliosissimo di te! 🥰",
    "Ogni goccia conta! 💧"
];

function showEncouragement() {
    const message = CUTE_PHRASES[Math.floor(Math.random() * CUTE_PHRASES.length)];
    document.getElementById('letterTitle').textContent = "Bravissima! 💕";
    document.getElementById('letterContent').textContent = message;

    // Ensure cheat style is removed just in case
    document.querySelector('.letter').classList.remove('cheat');

    document.getElementById('letterModal').classList.add('active');
}
const DRINK_MESSAGES = [
    "Brava amore! 💕", "Sei bellissima ✨", "Ti penso...", "Continua così!",
    "Orgoglioso di te! 💖", "Sei la mia forza!", "Splendida! 🌸", "Ti amo! ❤️",
    "Sei speciale! 🌟", "Bravissima! 👏"
];
function showFloatingMessage() {
    const message = DRINK_MESSAGES[Math.floor(Math.random() * DRINK_MESSAGES.length)];
    const el = document.createElement('div');
    el.className = 'floating-message';
    el.textContent = message;
    // Position randomly near center/top
    el.style.left = (Math.random() * 60 + 20) + '%';
    document.body.appendChild(el);

    // Remove after animation
    setTimeout(() => {
        el.remove();
    }, 2500);
}
function showLockedMessage() {
    const message = LOCKED_MESSAGES[Math.floor(Math.random() * LOCKED_MESSAGES.length)];
    document.getElementById('letterTitle').textContent = "Pazienza, Tesoro! 💕";
    document.getElementById('letterContent').textContent = message;
    document.getElementById('letterModal').classList.add('active');
}
function createMilestones() {
    const container = document.getElementById('milestones');
    container.innerHTML = '';
    LOVE_LETTERS.forEach((letter, index) => {
        const milestone = document.createElement('div');
        milestone.className = 'milestone';
        const isUnlocked = appState.unlockedLetters.includes(index);
        milestone.classList.add(isUnlocked ? 'unlocked' : 'locked');

        // Force the emojis to be treated as text content clearly
        const icon = isUnlocked ? '💌' : '🔒';

        milestone.innerHTML = `
            <div style="font-size: 1.8rem;">${icon}</div>
            <div class="milestone-number">${index + 1}</div>
        `;
        if (isUnlocked) {
            milestone.onclick = () => showLetter(index);
        } else {
            milestone.onclick = () => showLockedMessage();
        }
        container.appendChild(milestone);
    });
}
function checkForNewLetter() {
    const currentCompleted = appState.successfulDays + (appState.currentWater >= CONFIG.dailyGoal ? 1 : 0);
    const letterIndex = Math.floor(currentCompleted / CONFIG.daysForLetter) - 1;
    if (letterIndex >= 0 && letterIndex < LOVE_LETTERS.length && !appState.unlockedLetters.includes(letterIndex)) {
        appState.unlockedLetters.push(letterIndex);
        saveState();
        setTimeout(() => {
            createMilestones();
            celebrate();
            showLetter(letterIndex);
        }, 1000);
    }
}
function showLetter(index) {
    const letter = LOVE_LETTERS[index];
    document.getElementById('letterTitle').textContent = letter.title;
    document.getElementById('letterContent').textContent = letter.content;
    document.getElementById('letterModal').classList.add('active');
}
function showCheatLetter() {
    const letterEl = document.querySelector('.letter');
    letterEl.classList.add('cheat');
    document.getElementById('letterTitle').textContent = "Ti ho beccata! 😜";
    document.getElementById('letterContent').textContent = "Ehi! Non provare a fregarmi aggiungendo acqua a caso... L'ho capito che vuoi solo leggere le lettere! Bevi davvero e torna tra poco. L'amore richiede pazienza! ❤️";
    document.getElementById('letterModal').classList.add('active');
}

function closeLetter() {
    document.getElementById('letterModal').classList.remove('active');
    setTimeout(() => {
        document.querySelector('.letter').classList.remove('cheat');
    }, 300);
}
function celebrate() {
    const celebration = document.getElementById('celebration');
    const hearts = ['💕', '💖', '💗', '💓', '💞', '💝'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (2 + Math.random() * 2) + 's';
            celebration.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}
function startReminderTimer() {
    setInterval(() => {
        const hoursSinceLastDrink = (Date.now() - appState.lastDrinkTime) / (1000 * 60 * 60);
        const reminder = document.getElementById('reminder');
        if (hoursSinceLastDrink >= 2 && appState.currentWater < CONFIG.dailyGoal) {
            reminder.style.display = 'flex';
        } else {
            reminder.style.display = 'none';
        }
    }, 60000);
}
document.getElementById('letterModal').addEventListener('click', (e) => {
    if (e.target.id === 'letterModal') {
        closeLetter();
    }
});
function openAdmin() {
    const password = prompt("Inserisci password Admin:");
    if (password === "1234") {
        document.getElementById('adminModal').classList.add('active');
    } else if (password !== null) {
        alert("Password errata! 🚫");
    }
}
function closeAdmin() {
    document.getElementById('adminModal').classList.remove('active');
}
function adminFill() {
    appState.currentWater = CONFIG.dailyGoal;
    appState.lastDrinkTime = Date.now();
    saveState();
    updateUI();
    celebrate();
}
function adminAddDay() {
    appState.successfulDays++;
    appState.streak++;
    saveState();
    updateUI();
    checkForNewLetter();
}
function adminReset() {
    if (confirm("⚠️ SEI SICURO? Questo cancellerà TUTTI i dati e progressi!")) {
        localStorage.removeItem('waterLoveTracker');
        location.reload();
    }
}
document.getElementById('adminModal').addEventListener('click', (e) => {
    if (e.target.id === 'adminModal') {
        closeAdmin();
    }
});

// --- SOS COCCOLE ---
const HUG_MESSAGES = [
    "Ti stritolo forte forte! 🤗",
    "Sono qui con te, piccola! 🧸",
    "Un abbraccio gigante tutto per te! 💖",
    "Ti amo tantissimo!❤️"
];

function showHug() {
    const modal = document.getElementById('hugModal');
    const textEl = document.getElementById('hugText');

    // Pick random message
    textEl.innerHTML = HUG_MESSAGES[Math.floor(Math.random() * HUG_MESSAGES.length)].replace('\n', '<br>');

    modal.classList.add('active');

    // Optional: Vibration if mobile
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
}

function closeHug() {
    document.getElementById('hugModal').classList.remove('active');
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);