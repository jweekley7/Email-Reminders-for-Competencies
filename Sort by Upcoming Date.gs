//I just used a macro to do this initially. That's why this doesn't use my global variable.
//This sorts the spreadsheet by date so that the next to expire are at the top.
function sortByDate() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate();
  spreadsheet.getActiveRange().offset(1, 0, spreadsheet.getActiveRange().getNumRows() - 1).sort([{column: 14, ascending: false}, {column: 4, ascending: true}]);
};
