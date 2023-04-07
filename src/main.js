/*
  LUCKYDOG
  Copyright (C) 2023 Chris Cheng (orbitgw) <orbitgw@foxmail.com>

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
import _ from 'lodash';
import './css/style.css';
import './imgs/github-logo.svg';
import './imgs/settings.svg';
import './imgs/favicon.png';

let current;
let timeout;
let interval;
let first;
window.onload = function () {
  document.querySelector('#name-container').style = 'font-size: 48px;';
  document.querySelector('#name-container').innerHTML = 'Who will be the Lucky Dog?';
}

window.toogleDialog = function(id, visible) {
  if (interval) return
  let mask = document.getElementById(id + '-mask')
  let dialog = document.getElementById(id + '-dialog')
  if (visible) {
    mask.className = 'mask mask-show'
    dialog.className = 'dialog dialog-show'
    if (id === 'input') {
      let names = document.getElementById('names')
      let storage = localStorage.getItem('namesString')
      if (storage) {
        names.value = JSON.parse(storage)
      }
    }
  } else {
    mask.className = 'mask'
    dialog.className = 'dialog'
  }
}

window.confirm = function() {
  let value = document.getElementById('names').value
  if (typeof Storage !== 'undefined') {
    localStorage.setItem('namesString', JSON.stringify(value))
  } else {
    alert('Error: unsupport web storage')
  }
  window.toogleDialog('input', false)
}

window.start = function() {
  document.getElementById('name-container').style.color = 'black'; 
  if (interval) return
  let storage = localStorage.getItem('namesString')
  
  if (!storage) return
  let namasString = JSON.parse(storage)
  
  let nameList = namasString.split('\n').filter(item => item.trim())
  let len = nameList.length
  let i=0
  
  document.getElementById('name-container').innerHTML = '';
  document.querySelector('#name-container').style = 'font-size: 72px;';

  interval = setInterval(function () {
    
    let random = window.RandomNumBoth(0, len - 1)
    document.getElementById('name-container').innerHTML = nameList[random]
    i = i+10;
  }, 50+i)
  clearTimeout(timeout)
  timeout = setTimeout(function () {
    clearInterval(interval)
    interval = null
    document.getElementById('name-container').style.color = 'red'; 
  }, 1000)
}

window.RandomNumBoth = function(min, max) {
  return min + Math.round(Math.random() * (max - min))
}