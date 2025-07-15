// Returns array of bot names that support the given activity/encounter
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
// ...existing JavaScript code from previous script blocks goes here...
// (Move all JS code from the previous script block here, after this function)
// Enhanced activity data with better organization
// Add 🗝️ emoji to all chest checkpoints
function addChestEmoji(encounters) {
  return encounters.map(e =>
    /chest/i.test(e) && !/🗝️/.test(e) ? e.replace(/(Chest ?\d*)/i, '🗝️ $1') : e
  );
}

const activityData = { /* ...rest of the activityData object... */ };
// ...rest of the JavaScript code from your HTML file...
