function getBotSupport(activityName, encounterName) {
  if (!activityName || !encounterName) return [];
  // Try to match with/without (M) and with/without emoji
  const norm = s => s.replace(/🗝️/g, '').replace(/\(M\)/g, '').replace(/[^\w]/g, '').toLowerCase();
  const isMaster = /\(M\)/.test(encounterName);
  return botSupportMatrix.filter(bot => {
    const encs = bot.data[activityName];

// --- Improved logic: strict mode, IIFE, best practices ---
(function() {
  'use strict';

  // Utility: Validate Bungie Name
  function isValidBungieName(name) {
    return /^.{3,32}#\d{4}$/.test(name.trim());
  }

  // Utility: Show toast notification
  function showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  // State
  let selectedActivityType = null;
  let selectedActivity = null;
  let selectedEncounter = null;
  let isMasterDifficulty = false;

  // DOM Elements
  const bungieInput = document.getElementById('bungiename');
  const validationMsg = document.getElementById('validationMessage');
  const queueStringEl = document.getElementById('queueString');
  const copyBtn = document.getElementById('copyButton');
  const difficultyNormalBtn = document.getElementById('difficultyNormalbutton');
  const difficultyMasterBtn = document.getElementById('difficultyMasterbutton');
  const activityTypeContainer = document.getElementById('activityTypeButtons');
  const activityContainer = document.getElementById('activityButtons');
  const encounterContainer = document.getElementById('encounterButtons');

  // Validate Bungie Name and update UI
  function validateBungieName() {
    const name = bungieInput.value.trim();
    const valid = isValidBungieName(name);
    bungieInput.classList.toggle('valid', valid);
    bungieInput.classList.toggle('invalid', !valid);
    validationMsg.classList.toggle('show', !valid);
    return valid;
  }

  // Update queue string output
  function updateQueueString() {
    const name = bungieInput.value.trim();
    let queue = '!queue';
    if (selectedActivity && selectedEncounter !== null && validateBungieName()) {
      const activityCode = selectedActivity.code || '';
      const encounterNum = selectedEncounter + 1;
      const diffCode = isMasterDifficulty ? 'm' : 'n';
      queue = `!queue ${name} ${activityCode} ${encounterNum} ${diffCode}`;
      queueStringEl.classList.add('ready');
      copyBtn.disabled = false;
    } else {
      queueStringEl.classList.remove('ready');
      copyBtn.disabled = true;
    }
    queueStringEl.textContent = queue;
  }

  // Copy queue string to clipboard
  function handleCopy() {
    const text = queueStringEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Copied to clipboard!');
    });
  }

  // Highlight selected button in a container
  function highlightButton(container, selectedId) {
    Array.from(container.children).forEach(btn => {
      btn.classList.toggle('highlighted', btn.id === selectedId);
    });
  }

  // Render activity type buttons
  function renderActivityTypes() {
    // Example: Replace with your actual activity types
    const types = [
      { key: 'raids', label: 'Raids' },
      { key: 'dungeons', label: 'Dungeons' },
      { key: 'other', label: 'Stories/Other' }
    ];
    activityTypeContainer.innerHTML = '';
    types.forEach(type => {
      const btn = document.createElement('button');
      btn.textContent = type.label;
      btn.className = 'activitytype';
      btn.id = `activitytype-${type.key}`;
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        selectedActivityType = type.key;
        selectedActivity = null;
        selectedEncounter = null;
        highlightButton(activityTypeContainer, btn.id);
        renderActivities();
        renderEncounters();
        updateQueueString();
      });
      activityTypeContainer.appendChild(btn);
    });
  }

  // Render activities for selected type
  function renderActivities() {
    // Example: Replace with your actual activities per type
    const activities = {
      raids: [
        { name: "Vault of Glass", code: "vog" },
        { name: "Crota's End", code: "ce" },
        { name: "Root of Nightmares", code: "ron" }
        // ...
      ],
      dungeons: [
        { name: "Shattered Throne", code: "st" },
        { name: "Pit of Heresy", code: "poh" }
        // ...
      ],
      other: [
        { name: "Lightfall", code: "lf" }
        // ...
      ]
    };
    activityContainer.innerHTML = '';
    if (!selectedActivityType) return;
    activities[selectedActivityType].forEach((act, idx) => {
      const btn = document.createElement('button');
      btn.textContent = act.name;
      btn.className = 'activity';
      btn.id = `activity-${act.code}`;
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        selectedActivity = act;
        selectedEncounter = null;
        highlightButton(activityContainer, btn.id);
        renderEncounters();
        updateQueueString();
      });
      activityContainer.appendChild(btn);
    });
  }

  // Render encounters for selected activity
  function renderEncounters() {
    // Example: Replace with your actual encounters per activity
    const encounters = {
      vog: ["Confluxes", "Oracles", "Templar", "Gatekeeper", "Atheon"],
      ce: ["Abyss", "Bridge", "Ir Yut", "Crota"],
      ron: ["Cataclysm", "Scission", "Macrocosm", "Nezarec"],
      st: ["1", "2", "Simmumah"],
      poh: ["1", "2", "Zulmak"],
      lf: ["First Contact", "Under Siege"]
    };
    encounterContainer.innerHTML = '';
    if (!selectedActivity) return;
    const encList = encounters[selectedActivity.code] || [];
    encList.forEach((enc, idx) => {
      const btn = document.createElement('button');
      btn.textContent = enc;
      btn.className = 'encounter';
      btn.id = `encounter-${idx}`;
      btn.type = 'button';
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => {
        selectedEncounter = idx;
        highlightButton(encounterContainer, btn.id);
        updateQueueString();
      });
      encounterContainer.appendChild(btn);
    });
  }

  // Difficulty button handlers
  difficultyNormalBtn.addEventListener('click', () => {
    isMasterDifficulty = false;
    difficultyNormalBtn.classList.add('highlighted');
    difficultyMasterBtn.classList.remove('highlighted');
    difficultyNormalBtn.setAttribute('aria-pressed', 'true');
    difficultyMasterBtn.setAttribute('aria-pressed', 'false');
    updateQueueString();
  });
  difficultyMasterBtn.addEventListener('click', () => {
    isMasterDifficulty = true;
    difficultyNormalBtn.classList.remove('highlighted');
    difficultyMasterBtn.classList.add('highlighted');
    difficultyNormalBtn.setAttribute('aria-pressed', 'false');
    difficultyMasterBtn.setAttribute('aria-pressed', 'true');
    updateQueueString();
  });

  // Bungie name input validation
  bungieInput.addEventListener('input', () => {
    validateBungieName();
    updateQueueString();
  });

  // Copy button
  copyBtn.addEventListener('click', handleCopy);

  // Initial render
  renderActivityTypes();
  updateQueueString();

})();
    // Difficulty buttons
    var normBtn = document.getElementById('difficultyNormalbutton');
    if (normBtn) normBtn.addEventListener('click', function() { selectDifficulty(false); });
    var masterBtn = document.getElementById('difficultyMasterbutton');
    if (masterBtn) masterBtn.addEventListener('click', function() { selectDifficulty(true); });

    // Copy button
    var copyBtn = document.querySelector('.queueOptions button');
    if (copyBtn) copyBtn.addEventListener('click', copyButton);
});
