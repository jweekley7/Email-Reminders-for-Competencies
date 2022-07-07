//Long story short, I have to follow up with their test in 2 weeks. This puts an event on my calendar telling me who's test I need to follow up with 2 weeks after they complete it. 
function addToCalendar() {
  
  const dateCell = responseSheet.getRange('C2');

//The employee's name is included in their email address. I parse their name out using built-in functions and display it in this column. This is included in the calendar event title.  
  const nameCell = responseSheet.getRange('E2');

//Once the event has been added to the calendar, the corresponding cell in this column is marked "TRUE" so that duplicate events aren't created.  
  const eventAddedCell = responseSheet.getRange('G2');

//My calendar ID is removed for obvious reasons.  
  const myCalendar = CalendarApp.getCalendarById("justin.weekley@ascension.org");

  for (i=0; i<responseSheet.getLastRow()-1; i++) {

//If an event has not already been created...    
    if (eventAddedCell.offset(i,0).getValue() !== true) {

//...create the event on my calendar...      
      myCalendar.cAreateAllDayEvent(`${nameCell.offset(i,0).getValue()}'s competency`,new Date(dateCell.offset(i,0).getValue()));
      
//...and log true on the spreadsheet so duplicate events are not created.     
      eventAddedCell.offset(i,0).setValue(true);
    }
  }
}
