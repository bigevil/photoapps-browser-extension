// ==UserScript==
// @name MyWed
// @include http://*.mywed.ru/photographer/view/profile/*
// @require jquery-1.9.1.min.js
// ==/UserScript==

var $ = window.$.noConflict(true); // Required for Opera and IE

var fullName = $('h1.user-name').first().text();
var userName = fullName.replace(/\)$/, '').match(/[\w\d\-_]*$/)[0];
var userData;

//var request = kango.xhr.getXMLHttpRequest();
var requestDetails = {
	method: 'GET',
	url: 'http://photoapps.ru/mywed/user/profile/' + userName + '.json',
	async: true,
	contentType: 'json'
};

kango.xhr.send(requestDetails, function(data){
	if (data.status == 200 && data.response != null) {
    userData = data.response;
		prependHTML  = "<tr><td class='field-name'>Позиция:</td><td>" + userData.position + ", <a href='http://www.mywed.ru/photographer/popular/page/" + userData.current_page +"/'>" + userData.current_page +" страница</a></td></tr>";
		prependHTML += "<tr><td class='field-name'>По городу:</td><td>" + userData.position_by_city +", " + userData.page_by_city +" страница</td></tr>";
		prependHTML += "<tr><td colspan='2'><a href='http://photoapps.ru/mywed/user/profile/" + userName + "'>Расширенная статистика</a></td></tr>";
		prependHTML += "<tr><td>&nbsp;</td><td>&nbsp;</td></tr>";
		$('table.photographer-info').first().prepend(prependHTML);
  }
  else { // something went wrong
    kango.console.log("Can't get user data from photoapps.ru");
  }
});



