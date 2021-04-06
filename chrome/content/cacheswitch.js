// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

(function(){

  var CacheSwitch = {

    initialize: function() {
      this.log('CacheSwitch: initializing...');
      
      this.diskCache          = Application.prefs.get("browser.cache.disk.enable", true);
      this.memCache           = Application.prefs.get("browser.cache.memory.enable", true);
      this.showTextLabel      = Application.prefs.get("extensions.cacheswitch.textLabel");
      this.debug              = Application.prefs.get("extensions.cacheswitch.debug");
      
      this.label              = document.getElementById("CacheSwitch-Label");
      this.switchControl      = document.getElementById("CacheSwitch-Switch");
      this.textLabelMenuItem  = document.getElementById("CacheSwitch-ToggleTextLabelMenuItem");
      this.clearCacheMenuItem = document.getElementById("CacheSwitch-ClearCacheMenuItem");
      
      this.memCache.value     = this.diskCache.value;

      this.label.style.display = this.showTextLabel.value ? "" : "none";
      this.switchControl.setOn(this.diskCache.value);
      this.textLabelMenuItem.setAttribute("checked", this.showTextLabel.value);

      this.boundToggle = function(event){ CacheSwitch.toggle(event); };
      this.boundUpdate = function(event){ CacheSwitch.updateSwitchControl(event); };

      this.switchControl.addEventListener("change", this.boundToggle, false);
      this.diskCache.events.addListener("change", this.boundUpdate, false);
      this.memCache.events.addListener("change", this.boundUpdate, false);
      this.textLabelMenuItem.addEventListener("command", function(event){ CacheSwitch.toggleTextLabel(); }, false);
      this.clearCacheMenuItem.addEventListener("command", function(event){ CacheSwitch.clearCache(); }, false);
    },

    toggle: function(event) {
      this.setCacheTo(event.target.isOn);
      this.log('CacheSwitch: browser cache is enabled: ' + this.diskCache.value);
    },
    
    setCacheTo: function(value) {
      this.diskCache.events.removeListener("change", this.boundUpdate, false);
      this.memCache.events.removeListener("change", this.boundUpdate, false);
      this.memCache.value = this.diskCache.value = Boolean(value);
      this.diskCache.events.addListener("change", this.boundUpdate, false);
      this.memCache.events.addListener("change", this.boundUpdate, false);
    },

    toggleTextLabel: function() {
      this.showTextLabel.value = !this.showTextLabel.value;
      this.label.style.display = this.showTextLabel.value ? "" : "none";
    },

    updateSwitchControl: function(event) {
      var value = Application.prefs.get(event.data, true).value;
      this.switchControl.removeEventListener("change",this.boundToggle, false);
      this.switchControl.setOn(value);
      this.setCacheTo(value);
      this.switchControl.addEventListener("change",this.boundToggle, false);
    },
    
    clearCache: function() {
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
    },
    
    destroy: function() {
      this.switchControl.removeEventListener("change",this.boundToggle, false);
      this.diskCache.events.removeListener("change", this.boundUpdate);
      this.log('CacheSwitch: destroyed');
    },
    
    log: function(msg) {
      if (this.debug) {
        Application.console.log(msg);
      }
    }

  };

  window.addEventListener("load", function(){CacheSwitch.initialize();}, false);
  window.addEventListener("unload", function(){CacheSwitch.destroy();}, false);

})();