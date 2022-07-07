/**
 * These are the functions called by the triggers. The names tell how often the trigger runs.
 */

function weeklyTrigger() {
  sendReminderEmail();
  sortByDate();
}

function dailyTrigger() {
  sendInstructionsEmail();
  addToCalendar();
}
