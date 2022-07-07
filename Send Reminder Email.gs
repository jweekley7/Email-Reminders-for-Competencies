function sendReminderEmail() {
  
//I have a sheet for every year. I am manually creating these sheets so I have to manually change this sheet name.   
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2022");
  
//I manually entered the email address for each employee  
  const emailCell = spreadsheet.getRange("B2");
  
//Within 30 days of expiration, there is a built-in function that populates the corresponding cell in this column with 'YES'
  const sendEmailCell = spreadsheet.getRange("M2");
  
//Array of the email addresses of recipients of each email. This is sent to my email address so I know who is due for training.
  const remindersSentTo = [];

  const body = HtmlService.createTemplateFromFile("Renewal Email Template");
  const htmlBody = body.evaluate().getContent();
  
  for (i=0; i<spreadsheet.getLastRow()-1; i++) {
  
//If the send email cell == Yes...    
    if (sendEmailCell.offset(i, 0).getValue() == "Yes") {
      
//...add this email address to the remindersSentTo array so I know who got an email reminder...      
      remindersSentTo.push(emailCell.offset(i, 0).getValue());

//...then send the email. I format the email in an HTML file so it looks nicer      
      MailApp.sendEmail({
        to: emailCell.offset(i, 0).getValue(), 
        subject: "Annual IV Room Competency Reminder",
        body: body,
        htmlBody: htmlBody
      });
    }
  }
  
//If there were emails sent out, send me an email with a list of those email addresses that received it.  
  if (remindersSentTo.length > 0) {
    MailApp.sendEmail("justin.weekley@ascension.org", "Annual IV Room Competency Reminder", "Reminder sent to " + remindersSentTo + ".")
  }
}
