// ==UserScript==
// @name         autotassomai
// @namespace    https://github.com/matthewsanetra/
// @version      0.1
// @description  Thanks for answer0
// @author       Matthew Sanetra (GitHub: @matthewsanetra)
// @match        https://app.tassomai.com/dashboard/learner/*
// @grant        none
// @require      https://unpkg.com/xhook@latest/dist/xhook.min.js
// ==/UserScript==

(function() {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var answers = [];

    async function answer() {
        next_question:
        for (var correct_answer of answers) {
            var answers_parent = document.querySelector('#quiz-pane > div > div > div > quiz-new > div > div > div.quiz-pane__question.ng-star-inserted > div.quiz-pane__answer-box > div.quiz-pane__body > div');
            for (var child of answers_parent.children) {
                
                for (var _child of child.children) {
                    if (_child.nodeName == "SCRIPT") {
                        location.reload();
                    }
                }

                var current_answer = child.children[0].innerText;
                if (current_answer == correct_answer) {
                    child.children[0].click();
                    await sleep(3000);
                    continue next_question;
                }
            }
        }

        var quiz_finished_button = document.querySelector('#quiz-pane > div > div > div > quiz-new > div > div > tasso-quiz-end > div > div.tasso-quiz-end__continue > button');
        try {
            quiz_finished_button.click();
        } catch (all) {
            location.reload();
        }

        await sleep(2000);

        var level_up_button = document.querySelector('body > modal-container > div > div > div > div.level-up-container__content > div > button');
        if (level_up_button) {
            level_up_button.click();
        }

        await sleep(1000);

        var next_quiz_button = document.querySelector('body > tasso-app > tasso-entry > div > div > learner-dashboard > div > div.page-learner-dashboard__right-col > tass-goal-page > div > tass-quiz-suggestions-container > tass-quiz-suggestions > div > div.tass-quiz-list__quiz-suggestions > tass-start-quiz-container:nth-child(1) > tass-start-quiz > div > div.tass-start-quiz__bottom-container > div.tass-start-quiz__button > button');
        next_quiz_button.click();
    }

    xhook.after(function(request, response) {
        if(request.url == "https://data.tassomai.com/api/quiz/") {
            var json_obj = JSON.parse(response.text);
            for (var question of json_obj.questions) {
                answers.push(question.answer0);
            }

            setTimeout(answer, 5);
        }
    });
})();