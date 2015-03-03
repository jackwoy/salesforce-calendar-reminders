var bottomRow = document.getElementById("bottomButtonRow");
var newButton = document.createElement("input"); 

newButton.setAttribute("type","button");
newButton.setAttribute("value","Set Reminder");
newButton.className = "btn";

bottomRow.appendChild(newButton);