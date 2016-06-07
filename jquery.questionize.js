(function($) {
    var answears = {}
    var totalAnswears = 0;
    var history = []
    var settings = {}
    $.fn.questionize = function(options, callback) {
        settings = $.extend({
            startQuestion: null,
            hideAfterAnswear: true
        }, options);
        var that = this;
        var questions = $(this).find("[data-question]");
        totalAnswears = questions.length;
        if ($(that).find("[data-end]").length) {
            $(that).find("[data-end]").hide()
        }
        $(questions).each(function(index, question) {
            answears[$(question).attr("data-question")] = null;
            $(question).hide();
            if (settings.startQuestion != null) {
                var foundStartQuestion = false
                if (settings.startQuestion == $(question).attr("data-question")) {
                    foundStartQuestion = true;
                    $(question).show();
                }
                if (index == totalAnswears - 1 && foundStartQuestion) {
                    console.error("Could not find question: " + settings.startQuestion);
                }
            } else {
                if (index == 0) {
                    $(question).show();
                }
            }
        })
        $(questions).find("[data-answear]").click(function() {
            var boolBtn = $(this).attr("data-answear");
            var next = $(this).closest("[data-question]").attr("data-" + boolBtn)
            answears[$(this).closest("[data-question]").attr("data-question")] = boolBtn == 'true'
            if ((boolBtn == "true" || boolBtn == "false") && next.indexOf("END") == -1) {
                history.push($(this).closest("[data-question]").attr("data-question"))
                var index = history.indexOf($(this).closest("[data-question]").attr("data-question"))
                if (settings.hideAfterAnswear) {
                    $("[data-question]").each(function(index, question) {
                        $(question).slideUp();
                    })
                } else {
                    //Answear an earlier question and hide the non related questions
                    if (index + 1 != history.length) {
                        history.pop()
                        $("[data-end]").slideUp()
                        for (var i = 0; i < index + 1; i++) {
                            $("[data-question=" + history[i] + "]").slideDown()
                        }
                        history = history.slice(0, index + 1)
                        for (var q in answears) {
                            if (history.indexOf(q) == -1) {
                                $("[data-question=" + q + "]").slideUp()
                                $("[data-question=" + q + "]").find("[data-answear]").removeClass('selected')
                            }
                        }
                        //Set all invisivle question answears to null back
                        for (var q in answears) {
                            if (history.indexOf(q) == -1) {
                                answears[q] = null
                                $("[data-question=" + history[i] + "]").slideUp()
                            }
                        }
                    }
                }
                //Callback with answears
                if (callback) callback(answears);
                //show next question
                $("[data-question=" + next + "]").slideDown()
                $(this).closest("[data-question]").find("[data-answear]").removeClass('selected')
                $(this).addClass("selected")
            } else if (next.indexOf("END") > -1) {
                history.push($(this).closest("[data-question]").attr("data-question"))
                var index = history.indexOf($(this).closest("[data-question]").attr("data-question"))
                if (settings.hideAfterAnswear) {
                    $(this).closest("[data-question]").slideUp()
                } else {
                    //Answear an earlier question and hide the non related questions
                    if (index + 1 != history.length) {
                        history.pop()
                        $("[data-end]").slideUp()
                        for (var i = 0; i < index + 1; i++) {
                            $("[data-question=" + history[i] + "]").slideDown()
                        }
                        history = history.slice(0, index + 1)
                        for (var q in answears) {
                            if (history.indexOf(q) == -1) {
                                $("[data-question=" + q + "]").slideUp()
                                $("[data-question=" + q + "]").find("[data-answear]").removeClass('selected')
                            }
                        }
                        //Set all invisivle question answears to null back
                        for (var q in answears) {
                            if (history.indexOf(q) == -1) {
                                answears[q] = null
                                $("[data-question=" + history[i] + "]").slideUp()
                            }
                        }
                    }
                }
                //Callback with answears
                if (callback) callback(answears);
                if ($(that).find("[data-end=" + next + "]").length) {
                    $(that).find("[data-end=" + next + "]").slideDown()
                } else {
                    console.error("Can not find data-end=" + next + " in question " + $(this).closest("[data-question]").attr("data-question"));
                }
            } else if (next.indexOf("NULL") > -1) {
                $(this).closest("[data-question]").slideUp()
            } else {
                console.error("No correct answear found in question: " + $(this).closest("[data-question]").attr("data-question"));
            }
            $(this).closest("[data-question]").find("[data-answear]").removeClass('selected')
            $(this).addClass("selected")
        })
        if (settings.hideAfterAnswear) {
            $(that).find("[data-back]").click(function() {
                //slide up all questions
                $("[data-question]").each(function(index, question) {
                    $(question).slideUp();
                })
                $(that).find("[data-end]").slideUp()
                $(that).find("[data-question=" + history.pop() + "]").slideDown();
            })
        } else {
            $(that).find("[data-back]").hide()
        }
    };
}(jQuery));
