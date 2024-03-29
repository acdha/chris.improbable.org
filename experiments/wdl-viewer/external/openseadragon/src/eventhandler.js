/*
 * OpenSeadragon - EventHandler
 *
 * Copyright (C) 2009 CodePlex Foundation
 * Copyright (C) 2010-2013 OpenSeadragon contributors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * - Neither the name of CodePlex Foundation nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function ($) {
    /**
     * For use by classes which want to support custom, non-browser events.
     * TODO: This is an aweful name!  This thing represents an "event source",
     *       not an "event handler".  PLEASE change the to EventSource. Also please
     *       change 'addHandler', 'removeHandler' and 'raiseEvent' to 'bind',
     *       'unbind', and 'trigger' respectively.  Finally add a method 'one' which
     *       automatically unbinds a listener after the first triggered event that
     *       matches.
     * @class
     */
    $.EventHandler = function () {
        this.events = {};
    };

    $.EventHandler.prototype = {
        /**
         * Add an event handler for a given event.
         * @function
         * @param {String} eventName - Name of event to register.
         * @param {Function} handler - Function to call when event is triggered.
         */
        addHandler: function (eventName, handler) {
            var events = this.events[eventName];
            if (!events) {
                this.events[eventName] = events = [];
            }
            if (handler && $.isFunction(handler)) {
                events[events.length] = handler;
            }
        },

        /**
         * Remove a specific event handler for a given event.
         * @function
         * @param {String} eventName - Name of event for which the handler is to be removed.
         * @param {Function} handler - Function to be removed.
         */
        removeHandler: function (eventName, handler) {
            var events = this.events[eventName],
                handlers = [],
                i;
            if (!events) {
                return;
            }
            if ($.isArray(events)) {
                for (i = 0; i < events.length; i++) {
                    if (events[i] !== handler) {
                        handlers.push(events[i]);
                    }
                }
                this.events[eventName] = handlers;
            }
        },

        /**
         * Remove all event handlers for a given event type. If no type is given all
         * event handlers for every event type are removed.
         * @function
         * @param {String} eventName - Name of event for which all handlers are to be removed.
         */
        removeAllHandlers: function (eventName) {
            if (eventName) {
                this.events[eventName] = [];
            } else {
                for (var eventType in this.events) {
                    this.events[eventType] = [];
                }
            }
        },

        /**
         * Retrive the list of all handlers registered for a given event.
         * @function
         * @param {String} eventName - Name of event to get handlers for.
         */
        getHandler: function (eventName) {
            var events = this.events[eventName];
            if (!events || !events.length) {
                return null;
            }
            events =
                events.length === 1 ? [events[0]] : Array.apply(null, events);
            return function (source, args) {
                var i,
                    length = events.length;
                for (i = 0; i < length; i++) {
                    if (events[i]) {
                        events[i](source, args);
                    }
                }
            };
        },

        /**
         * Trigger an event, optionally passing additional information.
         * @function
         * @param {String} eventName - Name of event to register.
         * @param {Function} handler - Function to call when event is triggered.
         */
        raiseEvent: function (eventName, eventArgs) {
            //uncomment if you want to get a log of all events
            //$.console.log( eventName );
            var handler = this.getHandler(eventName);

            if (handler) {
                if (!eventArgs) {
                    eventArgs = {};
                }

                handler(this, eventArgs);
            }
        },
    };
})(OpenSeadragon);
