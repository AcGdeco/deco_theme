/*
 * *
 *  * Magepow
 *  * @category    Magepow
 *  * @copyright   Copyright (c) 2014 Magepow (http://www.magepow.com/)
 *  * @license     http://www.magepow.com/license-agreement.html
 *  * @Author: DavidDuong
 *  * @@Create Date: 4/16/19 3:20 PM
 *  * @@Modify Date: 7/14/20 3:20 PM
 *
 *
 */

define([
    'jquery',
    'Magento_Catalog/js/price-utils',
    'Magepow_Layerednav/js/layerednav',
    'jquery/ui-modules/widgets/slider',
    'jquery/ui'
], function($, ultil) {
    "use strict";

    $.widget('magepow.LayerednavSlider', $.magepow.layerednav, {
        options: {
            sliderElement: '#layerednav_price_slider',
            textElement: '#layered_ajax_price_text',
            inputElements: '#layered_ajax_price_input input',
            inputElementMin: '#layered_ajax_price_input input#layered_ajax_price_input_min',
            inputElementMax: '#layered_ajax_price_input input#layered_ajax_price_input_max',
            msgElementMin: '#layered_ajax_price_input .layered_ajax_price_input_msg_min',
            msgElementMax: '#layered_ajax_price_input .layered_ajax_price_input_msg_max',
            msgElementMaxMin: '#layered_ajax_price_input .layered_ajax_price_input_msg_max_min'
        },
        _create: function () {
            var self = this;
            $(this.options.sliderElement).slider({
                range: true,
                min: self.options.minValue,
                max: self.options.maxValue,
                step: self.options.step,
                values: [self.options.selectedFrom, self.options.selectedTo],
                slide: function( event, ui ) {
                    self.displayText(ui.values[0], ui.values[1]);
                },
                change: function(event, ui) {
                    self.ajaxSubmit(self.getUrl(ui.values[0], ui.values[1]));
                }
            });

            var minValue = self.options.selectedFrom;
            var maxValue = self.options.selectedTo;

            minValue = minValue.toFixed(2);
            maxValue = maxValue.toFixed(2);

            $(self.options.inputElementMin).val(minValue);
            $(self.options.inputElementMax).val(maxValue);

            $(this.options.inputElements).change(function() {
                var error = false;

                if($(self.options.inputElementMin).val() < self.options.minValue){
                    error = true;
                    $(self.options.msgElementMin).fadeIn(500);
                    $(self.options.msgElementMin).delay(2000).fadeOut(500);
                    $(self.options.msgElementMin).text('Valor mínimo ' + self.formatPrice(self.options.minValue));
                }
                
                if($(self.options.inputElementMax).val() > self.options.maxValue){
                    error = true;
                    $(self.options.msgElementMax).fadeIn(500);
                    $(self.options.msgElementMax).delay(2000).fadeOut(500);
                    $(self.options.msgElementMax).text('Valor máximo ' + self.formatPrice(self.options.maxValue));
                }
                
                var maxValue = parseFloat($(self.options.inputElementMax).val());
                var minValue = parseFloat($(self.options.inputElementMin).val());
                
                if (maxValue < minValue) {
                    error = true;
                    $(self.options.msgElementMaxMin).fadeIn(500);
                    $(self.options.msgElementMaxMin).delay(2000).fadeOut(500);
                }

                if(!error) {
                    self.ajaxSubmit(self.getUrl($(self.options.inputElementMin).val(), $(self.options.inputElementMax).val()));
                }

                error = false;
            });

            this.displayText(this.options.selectedFrom, this.options.selectedTo);
        },

        getUrl: function(from, to){
            return this.options.ajaxUrl.replace(encodeURI('{price_start}'), from).replace(encodeURI('{price_end}'), to);
        },

        displayText: function(from, to){
            $(this.options.textElement).html('<span class="from_fixed">'+this.formatPrice(from) + '</span><span class="space_fixed"> - </span><span class="to_fixed">' + this.formatPrice(to)+'</span>');
        },

        formatPrice: function(value) {
            return ultil.formatPrice(value, this.options.priceFormat);
        }
    });

    return $.magepow.LayerednavSlider;
});
