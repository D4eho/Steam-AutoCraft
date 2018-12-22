// ==UserScript==
// @name         Steam-AutoCraft
// @version      1.1.1
// @description  AutoCraft Badges of Specific Games in Steam
// @author       Lamanus (D4eho)
// @match        *://steamcommunity.com/*/gamecards/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @downloadURL  https://raw.githubusercontent.com/D4eho/Steam-AutoCraft/master/Steam-AutoCraft.user.js
// @updateURL    https://raw.githubusercontent.com/D4eho/Steam-AutoCraft/master/Steam-AutoCraft.user.js
// ==/UserScript==

// Isolate jQuery for compatibility with other scripts
jQuery.noConflict();

var craftBadgeState = 0;
var invLinks = jQuery('.gamecards_inventorylink');

jQuery(document).ready(function(){
    if (jQuery('.badge_card_to_collect').length === 0){
        checkBadge();
    }
    if (craftBadgeState == 1){
        addButton();
    }
    if (window.sessionStorage.autoCraftState){
        autoCraft();
    }
});

function addButton(){
    if (invLinks){
        invLinks.append('<a class="btn_grey_grey btn_medium autocraft"><span>AutoCraft remaining badges</span></a>');
        jQuery('.autocraft').click(function(){ autoCraft(); });
    }
}

function checkBadge(){
    if (jQuery('.badge_craft_button').length >= 1){
        craftBadgeState = 1;
    } else {
        delete window.sessionStorage.autoCraftState;
    }
}

function craftBadge(){
    jQuery('.badge_craft_button').click();
}

function autoCraft(){
    craftBadge();
    setTimeout(function(){ checkBadge(); window.location.reload(true); }, 10);
    window.sessionStorage.autoCraftState = 1;
}
