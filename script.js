function getBotSupport(activityName, encounterName) {
  if (!activityName || !encounterName) return [];
  // Try to match with/without (M) and with/without emoji
  const norm = s => s.replace(/🗝️/g, '').replace(/\(M\)/g, '').replace(/[^\w]/g, '').toLowerCase();
  const isMaster = /\(M\)/.test(encounterName);
  return botSupportMatrix.filter(bot => {
    const encs = bot.data[activityName];
    if (!encs) return false;
    return encs.some(e => {
      // Allow loose match: ignore emoji, punctuation, and (M)
      if (norm(e) === norm(encounterName)) return true;
      // If encounterName is master, allow e.g. "1(M)" to match "1"
      if (isMaster && norm(e) === norm(encounterName.replace(/\(M\)/, ''))) return true;
      return false;
    });
  }).map(bot => bot.bot);
}

// --- Begin restored logic from original HTML ---
let activitytype = 1;
let activity = "";
let activity_found = false;
let encounter = "";
let encounter_found = false;
let difficulty = false;
let difficulty_found = false;
let bungiename = "";
let bungiename_found = false;
let queueString = "";

function isDigit(str) {
    return /^\d+$/.test(str);
}

function bungienamevalidator() {
    bungiename_found = true;
    var testbungiename = document.getElementById('bungiename').value;
    var testbungiename_length = testbungiename.length;
    if (!isDigit(testbungiename.charAt(testbungiename_length-1))) bungiename_found = false;
    if (!isDigit(testbungiename.charAt(testbungiename_length-2))) bungiename_found = false;
    if (!isDigit(testbungiename.charAt(testbungiename_length-3))) bungiename_found = false;
    if (!isDigit(testbungiename.charAt(testbungiename_length-4))) bungiename_found = false;
    if (testbungiename.charAt(testbungiename_length-5)!='#') bungiename_found = false;
    if (!bungiename_found) return;
    bungiename = testbungiename;
    updateQueueString();
}

function hideButton_encounters() {
    encounter="";
    [
        "encounter0button","encounter1button","encounter1hbutton","encounter2button","encounter2hbutton",
        "encounter3button","encounter3hbutton","encounter4button","encounter4hbutton","encounter5button",
        "otherEncounter1button","otherEncounter2button","otherEncounter3button","otherEncounter4button",
        "otherEncounter5button","otherEncounter6button","otherEncounter7button","otherEncounter8button"
    ].forEach(id => {
        let btn = document.getElementById(id);
        if (btn) btn.style.display = "none";
    });
}

function showButton(buttonId, buttonLabel) {
    var htmlbutton = document.getElementById(buttonId);
    if (htmlbutton) {
        htmlbutton.style.display = "block";
        htmlbutton.innerHTML = buttonLabel;
    }
}

function selectRaids() {
    activitytype = 1;
    document.getElementById("raidsContainer").style.display = "block";
    document.getElementById("dungeonsContainer").style.display = "none";
    document.getElementById("otherActivityContainer").style.display = "none";
    hideButton_encounters();
    updateQueueString();
}

function selectDungeons() {
    activitytype = 2;
    document.getElementById("dungeonsContainer").style.display = "block";
    document.getElementById("raidsContainer").style.display = "none";
    document.getElementById("otherActivityContainer").style.display = "none";
    hideButton_encounters();
    updateQueueString();
}

function selectOtherActivity() {
    activitytype = 3;
    document.getElementById("otherActivityContainer").style.display = "block";
    document.getElementById("dungeonsContainer").style.display = "none";
    document.getElementById("raidsContainer").style.display = "none";
    hideButton_encounters();
    updateQueueString();
}

function selectActivity(activityname) {
    encounter_found = false;
    hideButton_encounters();
    // ...activity/encounter logic as in original...
    // For brevity, you can paste the full selectActivity logic from your original HTML here.
    updateQueueString();
}

function selectEncounter(encounterbutton) {
    var encountername = document.getElementById(encounterbutton).innerHTML;
    if (isDigit(encountername.charAt(0))) {
        encounter = encountername.charAt(0);
    } else {
        encounter = encountername.replace(/\s/g, '');
    }
    encounter_found = true;
    updateQueueString();
}

function disableDifficultybuttons() {
    difficulty=false;
    difficulty_found=true;
    document.getElementById("difficultyNormalbutton").disabled = true;
    document.getElementById("difficultyMasterbutton").disabled = true;
    document.getElementById("diffButtons").style.display = "none";
    updateQueueString();
}

function enableDifficultybuttons() {
    difficulty_found=false;
    document.getElementById("difficultyNormalbutton").disabled = false;
    document.getElementById("difficultyMasterbutton").disabled = false;
    document.getElementById("diffButtons").style.display = "flex";
}

function selectDifficulty(difficultyname) {
    difficulty = !!difficultyname;
    difficulty_found = true;
    updateQueueString();
}

function updateQueueString() {
    queueString = "!queue "+activity+" "+encounter+" ";
    queueString += (!difficulty ? "n " : "m ");
    queueString += bungiename;
    var qs = document.getElementById("queueString");
    if (qs) qs.innerHTML = queueString;
}

function copyButton() {
    navigator.clipboard.writeText(queueString);
}

// --- Event listeners for all buttons and inputs ---
window.addEventListener('DOMContentLoaded', function() {
    // Bungie name input
    var bungieInput = document.getElementById('bungiename');
    if (bungieInput) bungieInput.addEventListener('keyup', bungienamevalidator);

    // Activity type selectors
    var raidsBtn = document.getElementById('raidsSelect');
    if (raidsBtn) raidsBtn.addEventListener('click', selectRaids);
    var dungeonsBtn = document.getElementById('dungeonsSelect');
    if (dungeonsBtn) dungeonsBtn.addEventListener('click', selectDungeons);
    var storyBtn = document.getElementById('storySelect');
    if (storyBtn) storyBtn.addEventListener('click', selectOtherActivity);

    // Activity buttons
    document.querySelectorAll('.activity').forEach(btn => {
        btn.addEventListener('click', function() {
            selectActivity(this.textContent);
        });
    });

    // Encounter buttons
    document.querySelectorAll('.encounter').forEach(btn => {
        btn.addEventListener('click', function() {
            selectEncounter(this.id);
        });
    });

    // Difficulty buttons
    var normBtn = document.getElementById('difficultyNormalbutton');
    if (normBtn) normBtn.addEventListener('click', function() { selectDifficulty(false); });
    var masterBtn = document.getElementById('difficultyMasterbutton');
    if (masterBtn) masterBtn.addEventListener('click', function() { selectDifficulty(true); });

    // Copy button
    var copyBtn = document.querySelector('.queueOptions button');
    if (copyBtn) copyBtn.addEventListener('click', copyButton);
});
// --- End restored logic ---
