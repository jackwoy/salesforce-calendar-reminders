// ==UserScript==
// @name         Salesforce Google Calendar
// @namespace    com.ooyala.jackw
// @version      1.0
// @description  Adds UI for creating Google Calendar events from Salesforce comments
// @author       jackw@ooyala.com
// @match        https://na5.salesforce.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js
// ==/UserScript==

var urlStart = "http://www.google.com/calendar/event?action=TEMPLATE";

function addButton(){
	var topRow = $("#topButtonRow");
	var bottomRow = $("#bottomButtonRow");

	var newButtonHTML = '<input class="btn" type="button" value="Set Reminder" onclick="$(\'#gcal_ext_popup\').dialog(\'open\');" />';

	// TODO: Necessary wireup for GCal event creation.

	topRow.append(newButtonHTML);
	bottomRow.append(newButtonHTML);
}

function addFormHTML(){
	var formHTML = '<div id="gcal_ext_popup" title="Reminder Dialog">\
	<label for="gcal_ext_start">Start Time</label>\
	<input id="gcal_ext_start" type="datetime-local" />\
	<label for="gcal_ext_end">End Time</label>\
	<input id="gcal_ext_end" type="datetime-local" />\
	<label for="gcal_ext_allday">All Day</label>\
	<input id="gcal_ext_allday" type="checkbox" />\
	<label for="gcal_ext_title">Title</label>\
	<input id="gcal_ext_title" type="text" />\
	<label for="gcal_ext_desc">Description</label>\
	<input id="gcal_ext_desc" type="text" />\
	<input id="gcal_ext_update" type="button" value="Set reminder" />\
	</div>';

	var formCSS = '<style type="text/css">\
	#gcal_ext_popup label, #gcal_ext_popup input{\
		display:block;\
		width:100%;\
	}\
	#gcal_ext_popup input{\
		margin-bottom:10px;\
	}\
	</style>';

	$('body').append(formHTML);
	$('head').append(formCSS);
	$("#gcal_ext_popup").dialog({autoOpen:false});
	$("#gcal_ext_update").click(updateURL);
	setCurrentDateTime();
	populateTitleDesc();
}

function setCurrentDateTime(){
	var currentDateTime = getDatetimeLocalString(new Date(Date.now()));
	$('#gcal_ext_start').val(currentDateTime);
	$('#gcal_ext_end').val(currentDateTime);
}

function populateTitleDesc(){
	var caseHeader = $('.pageDescription').text();
	var titleText = "Update" + caseHeader;
	var descText = $('td.labelCol:contains("Subject")').next('td').text();
	$('#gcal_ext_title').val(titleText);
	$('#gcal_ext_desc').val(descText);
}

function updateURL(){
	var start = $('#gcal_ext_start').val();
	var end = $('#gcal_ext_end').val();
	var title = $('#gcal_ext_title').val();
	var desc = $('#gcal_ext_desc').val();
	var allday = $('#gcal_ext_allday:checked').val();
	var fullURL = 
		urlStart +
		"&text=" + encodeURIComponent(title) +
		"&dates=" + getGCalDate(new Date(start), allday) + "/" + getGCalDate(new Date(end), allday) +
		"&details=" + encodeURIComponent(desc) +
		"&sprop=website:";
	window.open(fullURL);
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

$('head').append('<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">');
addButton();
addFormHTML();