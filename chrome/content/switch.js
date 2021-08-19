// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

function getCurrentPrefs() {
 var BrwsrPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
 document.getElementById("CacheSwitch-Label").hidden = !(BrwsrPrefs.getBoolPref("extensions.cacheswitch.textLabel"));
 document.getElementById("CacheSwitch-Label-Memory").hidden = !(BrwsrPrefs.getBoolPref("extensions.cacheswitch.textLabel.memory"));
 document.getElementById("CacheSwitch-Switch-Memory").checked = BrwsrPrefs.getBoolPref("browser.cache.memory.enable");
 document.getElementById("CacheSwitch-Label-Disk").hidden = !(BrwsrPrefs.getBoolPref("extensions.cacheswitch.textLabel.disk"));
 document.getElementById("CacheSwitch-Switch-Disk").checked = BrwsrPrefs.getBoolPref("browser.cache.disk.enable");
}

function setLblPref() {
 var BrwsrPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
 if (BrwsrPrefs.getBoolPref("extensions.cacheswitch.textLabel") == true)
  BrwsrPrefs.setBoolPref("extensions.cacheswitch.textLabel", false);
 else
  BrwsrPrefs.setBoolPref("extensions.cacheswitch.textLabel", true);
 getCurrentPrefs();
}

function setMemLblPref() {
 var BrwsrPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
 if (BrwsrPrefs.getBoolPref("extensions.cacheswitch.textLabel.memory") == true)
  BrwsrPrefs.setBoolPref("extensions.cacheswitch.textLabel.memory", false);
 else
  BrwsrPrefs.setBoolPref("extensions.cacheswitch.textLabel.memory", true);
 getCurrentPrefs();
}
function setMemPref() {
 var BrwsrPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
 if (BrwsrPrefs.getBoolPref("browser.cache.memory.enable") == true)
  BrwsrPrefs.setBoolPref("browser.cache.memory.enable", false);
 else
  BrwsrPrefs.setBoolPref("browser.cache.memory.enable", true);
}

function setDiskLblPref() {
 var BrwsrPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
 if (BrwsrPrefs.getBoolPref("extensions.cacheswitch.textLabel.disk") == true)
  BrwsrPrefs.setBoolPref("extensions.cacheswitch.textLabel.disk", false);
 else
  BrwsrPrefs.setBoolPref("extensions.cacheswitch.textLabel.disk", true);
 getCurrentPrefs();
}
function setDiskPref() {
 var BrwsrPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
 if (BrwsrPrefs.getBoolPref("browser.cache.disk.enable") == true)
  BrwsrPrefs.setBoolPref("browser.cache.disk.enable", false);
 else
  BrwsrPrefs.setBoolPref("browser.cache.disk.enable", true);
}