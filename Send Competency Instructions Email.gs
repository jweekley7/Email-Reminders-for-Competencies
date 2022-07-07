//They fill out a Google Form to schedule their training. Those responses are logged in another sheet. Once logged, they will receive an email with the instructions for completing the training.
function sendInstructionsEmail() {

  const emailCell = responseSheet.getRange("B2");
  
//Should be sentEmailCell. Once the instructions are sent, "TRUE" is logged in this column for each person.  
  const sendEmailCell = responseSheet.getRange("D2");
  
//Every email address that has instructions sent is pushed to this array and later sent to me so I know who received them.  
  const instructionsSentTo = [];

  const body = HtmlService.createTemplateFromFile("Instructions Email Template");
  const htmlBody = body.evaluate().getContent();
  
//Retrieves the instructions document from my Drive to be attached to the email  
  const instructionsAttachment = DriveApp.getFileById('1b_Jao4EIyqy7TYL9st1Q5Kb92qydHWwdLp6gUlXF7-k');
  
  for (i=0; i<responseSheet.getLastRow()-1; i++) {
  
//If the instructions have already been sent, do nothing. Otherwise, proceed to sending them
    if (sendEmailCell.offset(i, 0).getValue() !== true) {
      
//Pushes the email addresses to this array      
      instructionsSentTo.push(emailCell.offset(i, 0).getValue());

//Send the email. Formatted in an html file. Attaches the instructions document.      
      MailApp.sendEmail({
        to: emailCell.offset(i, 0).getValue(), 
        subject: "Annual Sterile Compounding Competency Instructions",
        body: body,
        htmlBody: htmlBody,
        attachments: [instructionsAttachment]
      });

//For each person that has received the instructions, this corresponding cell is marked TRUE so that they will not receive duplicate emails     
     sendEmailCell.offset(i, 0).setValue(true);
    }
  }
  
//If emails are sent, send me an email with the list of email addresses so I know who received the instructions.  
  if (instructionsSentTo.length > 0) {
    MailApp.sendEmail("justin.weekley@ascension.org", "Annual Sterile Compounding Competency Instructions", "Instructions sent to " + instructionsSentTo + ".")
  }
}
