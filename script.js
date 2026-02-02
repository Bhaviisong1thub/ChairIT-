const channel = new BroadcastChannel('mun_master_sync');

let state = {
    timeLeft: 90,
    isActive: false,
    speaker: "FLOOR CLOSED",
    message: "WELCOME DELEGATES",
    yes: 0, no: 0, abs: 0,
    quorum: 0,
    caucusTopic: "",
    caucusTime: 0,
    resTitle: "", resBody: "",
    lastTick: Date.now()
};

channel.onmessage = (e) => {
    state = e.data;
    updateUI();
};

function broadcast() { channel.postMessage(state); }

function updateUI() {
    const mins = Math.floor(state.timeLeft / 60);
    const secs = (state.timeLeft % 60).toString().padStart(2, '0');
    const timeStr = mins + ":" + secs;

    // Chair Elements
    if(document.getElementById('chair-timer')) document.getElementById('chair-timer').innerText = timeStr;
    if(document.getElementById('vote-tally')) {
        document.getElementById('vote-tally').innerText = `Y:${state.yes} N:${state.no} A:${state.abs}`;
    }
    
    // Projector Elements
    const pTimer = document.getElementById('proj-timer');
    if(pTimer) {
        pTimer.innerText = timeStr;
        if(state.timeLeft < 10 && state.isActive) pTimer.classList.add('warning-timer');
        else pTimer.classList.remove('warning-timer');
    }

    if(document.getElementById('proj-country')) document.getElementById('proj-country').innerText = state.speaker;
    if(document.getElementById('proj-msg-bar')) document.getElementById('proj-msg-bar').innerText = state.message;
    
    // Caucus Display
    const cBox = document.getElementById('caucus-box');
    if(cBox && state.caucusTopic) {
        cBox.style.display = 'block';
        document.getElementById('proj-caucus-topic').innerText = state.caucusTopic;
        document.getElementById('proj-caucus-time').innerText = state.caucusTime;
    }

    // Majority Display
    const simpleMaj = Math.floor(state.quorum / 2) + 1;
    if(document.getElementById('simple-maj')) {
        document.getElementById('quorum-val').innerText = state.quorum;
        document.getElementById('simple-maj').innerText = simpleMaj;
        document.getElementById('triple-maj').innerText = Math.ceil((state.quorum * 2) / 3);
    }
    if(document.getElementById('proj-quorum')) document.getElementById('proj-quorum').innerText = "SIMPLE MAJ: " + simpleMaj;
}

// Controls
function startTimer() { state.isActive = true; state.lastTick = Date.now(); broadcast(); }
function pauseTimer() { state.isActive = false; broadcast(); }
function resetTimer(s) { state.timeLeft = s; state.isActive = false; broadcast(); updateUI(); }

function updateQuorum(val) { state.quorum = parseInt(val) || 0; broadcast(); updateUI(); }

function updateCaucus() {
    state.caucusTopic = document.getElementById('caucus-topic').value.toUpperCase();
    state.caucusTime = document.getElementById('caucus-total').value;
    broadcast(); updateUI();
}

function setSpeaker() {
    state.speaker = document.getElementById('speaker-input').value.toUpperCase();
    state.timeLeft = 90;
    broadcast(); updateUI();
}

function updateMessage() {
    state.message = document.getElementById('msg-input').value.toUpperCase();
    broadcast(); updateUI();
}

function updateResolution() {
    state.resTitle = document.getElementById('res-title').value;
    state.resBody = document.getElementById('res-body').value;
    broadcast();
}

function toggleResView() {
    const overlay = document.getElementById('res-overlay');
    if(state.resTitle) {
        overlay.style.display = (overlay.style.display === 'none') ? 'block' : 'none';
        document.getElementById('proj-res-title').innerText = state.resTitle;
        document.getElementById('proj-res-body').innerText = state.resBody;
    }
}

function castVote(t) { 
    if(t==='yes') state.yes++; 
    else if(t==='no') state.no++; 
    else state.abs++; 
    broadcast(); updateUI(); 
}

function resetVote() { state.yes=0; state.no=0; state.abs=0; broadcast(); updateUI(); }

// Precision Timer Loop
setInterval(() => {
    if (state.isActive && state.timeLeft > 0) {
        const now = Date.now();
        if (now - state.lastTick >= 1000) {
            state.timeLeft--;
            state.lastTick = now;
            updateUI(); 
            broadcast();
            if(state.timeLeft === 0) {
                try { document.getElementById('gavelSound').play(); } catch(e){}
            }
        }
    }
}, 100);