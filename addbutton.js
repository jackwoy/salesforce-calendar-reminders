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

var urlStart = "http://www.google.com/calendar/event?action=TEMPLATE";

function addButton(){
	var topRow = $("#topButtonRow");
	var bottomRow = $("#bottomButtonRow");

	var newButtonHTML = '<input class="btn" type="button" value="Set Reminder" onclick="alert(\'Not yet implemented.\');" />'

	// TODO: Necessary wireup for GCal event creation.

	topRow.append(newButtonHTML);
	bottomRow.append(newButtonHTML);
}

function updateURL(){
	var start = document.getElementById('start').value;
	var end = document.getElementById('end').value;
	var title = document.getElementById('title').value;
	var desc = document.getElementById('desc').value;
	var allday = document.getElementById('allday').checked;

	var fullURL = 
		urlStart +
		"&text=" + encodeURIComponent(title) +
		"&dates=" + getGCalDate(new Date(start), allday) + "/" + getGCalDate(new Date(end), allday) +
		"&details=" + encodeURIComponent(desc) +
		"&sprop=website:";

	console.log(fullURL);
}

function getGCalDate(date, dateOnly){
	var replacePattern = /[-:.]/gi;
	var dstring = date.toISOString();
	// Remove -, :, . from date string.
	var gCalDate = dstring.replace(replacePattern, "");
	if(dateOnly){
		// Remove the time string altogether.
		gCalDate = gCalDate.substring(0, gCalDate.length - 11);
	}
	else{
		// Remove milliseconds from date string, and reappend UTC indicator to the end.
		gCalDate = gCalDate.substring(0, gCalDate.length - 4) + "Z";
	}
	return gCalDate;
}

function getDatetimeLocalString(date){
	var dateString = 
		date.getFullYear() + '-' +
		toTwoDigits(date.getMonth() + 1) + '-' +
		toTwoDigits(date.getDate()) + 
		'T' +
		toTwoDigits(date.getHours()) + ':' +
		toTwoDigits(date.getMinutes());
	return dateString;
}

function toTwoDigits(datePart)
{
	if(datePart < 10)
	{
		return "0"+datePart.toString();
	}
	else
	{
		return datePart;
	}
}

addButton();