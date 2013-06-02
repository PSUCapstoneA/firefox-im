// Main Javascript Entrance Point
'use strict';

// Create Namespace
var FirefoxIM = window.FirefoxIM || {};

// Creating Dom elements works!
var thread = document.createElement('li');
var paragraph = document.createElement('p');
var text = document.createTextNode('Javascript started');
paragraph.appendChild(text);
thread.appendChild(paragraph);
var threadList = document.querySelector('#threads ul'); 
threadList.appendChild(thread);

// But jQuery is easier
$('#threads ul').append('<li><p>jQuery is easier</p></li>');