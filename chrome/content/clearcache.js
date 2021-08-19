// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

function clearCache() {
  var AppID = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo).ID
  if(("nsIXULAppInfo" in Components.interfaces) && ((AppID == "{a3210b97-8e8a-4737-9aa0-aa0e607640b9}") || (AppID == "{92650c4d-4b8e-4d2a-b7eb-24ecf4f6b63a}"))){
   Services.cache2.clear(); // If Navigator
  } else {
   // From moonchild-central/source/palemoon/components/preferences/advanced.js
   var cache = Components.classes["@mozilla.org/netwerk/cache-storage-service;1"]
                         .getService(Components.interfaces.nsICacheStorageService);
   try {
    cache.clear();
   } catch(ex) {}
  }
}