// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

angular.module('mm.addons.qtype_ddwtos')

/**
 * Drag and drop into text question handlers.
 *
 * @module mm.addons.qtype_ddwtos
 * @ngdoc service
 * @name $mmaQtypeDdwtosHandler
 */
.factory('$mmaQtypeDdwtosHandler', function($mmQuestion) {

    var self = {};

    /**
     * Check if a response is complete.
     *
     * @param  {Object} answers Question answers (without prefix).
     * @return {Mixed}          True if complete, false if not complete, -1 if cannot determine.
     */
    self.isCompleteResponse = function(answers) {
        // An answer is complete if all drop zones have an answer. Since we don't have the list of drop zones
        // we cannot determine if the answer is complete, only if it's unanswered.
        var hasReponse = false;
        angular.forEach(answers, function(value) {
            if (value && value !== '0') {
                hasReponse = true;
            }
        });
        return hasReponse ? -1 : false;
    };

    /**
     * Whether or not the module is enabled for the site.
     *
     * @return {Boolean}
     */
    self.isEnabled = function() {
        return true;
    };

    /**
     * Check if a student has provided enough of an answer for the question to be graded automatically,
     * or whether it must be considered aborted.
     *
     * @param  {Object} answers Question answers (without prefix).
     * @return {Mixed}          True if gradable, false if not gradable, -1 if cannot determine.
     */
    self.isGradableResponse = function(answers) {
        var hasReponse = false;
        angular.forEach(answers, function(value) {
            if (value && value !== '0') {
                hasReponse = true;
            }
        });
        return hasReponse;
    };

    /**
     * Check if two responses are the same.
     *
     * @param  {Object} prevAnswers Previous answers.
     * @param  {Object} newAnswers  New answers.
     * @return {Boolean}            True if same, false otherwise.
     */
    self.isSameResponse = function(prevAnswers, newAnswers) {
        return $mmQuestion.compareAllAnswers(prevAnswers, newAnswers);
    };

    /**
     * Get the behaviour for this question.
     *
     * @param  {Object} question  Question to get the directive for.
     * @param  {String} behaviour Default behaviour.
     * @return {String}           Behaviour name.
     */
    self.getBehaviour = function(question, behaviour) {
        if (behaviour === 'interactive') {
            return 'interactivecountback';
        }
        return behaviour;
    };

    /**
     * Get the directive.
     *
     * @param {Object} question The question.
     * @return {String}         Directive's name.
     */
    self.getDirectiveName = function(question) {
        return 'mma-qtype-ddwtos';
    };

    return self;
});
