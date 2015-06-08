// ==UserScript==
// @name         Salesforce Google Calendar
// @namespace    http://com.ooyala.jackw
// @version      0.1
// @description  Adds UI for creating Google Calendar events from Salesforce comments
// @author       jackw@ooyala.com
// @match        https://na5.salesforce.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

function addButton(){
	var topRow = $("#topButtonRow");
	var bottomRow = $("#bottomButtonRow");
	var newButtonTop = document.createElement("input"); 

	newButtonTop.setAttribute("type","button");
	newButtonTop.setAttribute("value","Set Reminder");
	newButtonTop.setAttribute("onclick","alert('Not yet implemented.');");
	newButtonTop.className = "btn";

	// TODO: Necessary wireup for GCal event creation.

	var newButtonBottom = newButtonTop.cloneNode();

	topRow.append(newButtonTop);
	bottomRow.append(newButtonBottom);
}

addButton();