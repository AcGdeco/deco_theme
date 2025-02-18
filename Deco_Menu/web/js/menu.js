define([
    'jquery'
], function ($) {
    'use strict';

    return {
        menuHeight: function () {
            var level0;
            var group;
            var qtdUlMax;
            var height;
            var liHeight = 34;
            var level0Ul;
            var li;
            var i;

            level0Ul = document.querySelectorAll(".deco-menu .level-0 > ul");
            group = document.querySelectorAll(".deco-menu .level-0 .group");
            li = document.querySelectorAll(".deco-menu li");

            qtdUlMax = level0Ul.length;

            for(i=0;i<group.length;i++){
                if(group[i].children.length > qtdUlMax){
                    qtdUlMax = group[i].children.length;
                }
            }

            for(i=0;i<li.length;i++){
                li[i].style.height = liHeight + "px";
            }
            height = (liHeight * qtdUlMax);

            level0 = document.querySelectorAll(".deco-menu .level-0");
            if(level0.length > 0){
                level0[0].style.height = height + "px";
            }

            for(i=0;i<group.length;i++){
                group[i].style.height = height + "px";
            }
        }
    };
});
