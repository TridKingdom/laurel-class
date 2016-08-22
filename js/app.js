(function(_) {
  'use strict';

  var tkDataStore = window.tkDataStore = window.tkDataStore || {};

  tkDataStore.csvSource = {
    local: {
      basic: 'data/basic.csv',
      advanced: 'data/advanced.csv',
    },
    drive: {
      basic: 'https://docs.google.com/spreadsheets/d/193O-BB0Z4lESRCLHWkJX8nU2SmhavMnNX5gHJiSCVp8/export?format=csv',
      advanced: 'https://docs.google.com/document/d/1j3z7_E8xhprMX2yT3rHnkA37jWKtJTbfyDmk0oDej9M/export',
    }
  };

  tkDataStore.questionModules = {
    basic: {},
    advanced: {},
  };

  tkDataStore.decisionText = {
    yes: '你真了不起',
    no: '再接再厲吧',
  };

})(window._);;(function($, _, Handlebars) {
  'use strict';

  $(function() {
    var tkDataStore = window.tkDataStore = window.tkDataStore || {};

    tkDataStore.templateSources = {
      moduleBasic: {id: 'moduleBasic', path: 'templates/module-basic.hbs', template: '', partial: false},
      moduleAdvanced: {id: 'moduleAdvanced', path: 'templates/module-advanced.hbs', template: '', partial: false},

      slideReady: {id: 'slideReady', path: 'templates/slide-ready.hbs', template: '', partial: true},
      slideScoreList: {id: 'slideScoreList', path: 'templates/slide-score-list.hbs', template: '', partial: true},

      slideQuestionBasic: {id: 'slideQuestionBasic', path: 'templates/slide-question-basic.hbs', template: '', partial: true},
      slideQuestionAdvanced: {id: 'slideQuestionAdvanced', path: 'templates/slide-question-advanced.hbs', template: '', partial: true},
      slideDetail: {id: 'slideDetail', path: 'templates/slide-detail.hbs', template: '', partial: true},
      slideDecision: {id: 'slideDecision', path: 'templates/slide-decision.hbs', template: '', partial: true},
      slideYes: {id: 'slideYes', path: 'templates/slide-yes.hbs', template: '', partial: true},
      slideNo: {id: 'slideNo', path: 'templates/slide-no.hbs', template: '', partial: true},

      qcac: {id: 'qcac', path: 'templates/qcac.hbs', template: '', partial: true},
      qiac: {id: 'qiac', path: 'templates/qiac.hbs', template: '', partial: true},
      qvac: {id: 'qvac', path: 'templates/qvac.hbs', template: '', partial: true},
      qaac: {id: 'qaac', path: 'templates/qaac.hbs', template: '', partial: true},
      qcai: {id: 'qcai', path: 'templates/qcai.hbs', template: '', partial: true},
      qcan: {id: 'qcan', path: 'templates/qcan.hbs', template: '', partial: true},
      qian: {id: 'qian', path: 'templates/qian.hbs', template: '', partial: true},
      qvan: {id: 'qvan', path: 'templates/qvan.hbs', template: '', partial: true},
      qaan: {id: 'qaan', path: 'templates/qaan.hbs', template: '', partial: true}
    };

    function activate() {
      preFetchTemplates();
      registerIfCondHelper();
    }

    function preFetchTemplates() {
      _.forEach(tkDataStore.templateSources, function(source) {
        $.get(source.path)
          .then(function(template) {
            // source.template = Handlebars.compile(template);
            source.template = template;
            return source;
          })
          .then(function(source) {
            if (source.partial) Handlebars.registerPartial(source.id, source.template);
          })
          .fail(function(err) {
            console.warn('Fail loading template <' + source.id + '> , please check whether the template file exist');
          });
      });
    }

    function registerIfCondHelper() {
      Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
          case '==':
              return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '===':
              return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '<':
              return (v1 < v2) ? options.fn(this) : options.inverse(this);
          case '<=':
              return (v1 <= v2) ? options.fn(this) : options.inverse(this);
          case '>':
              return (v1 > v2) ? options.fn(this) : options.inverse(this);
          case '>=':
              return (v1 >= v2) ? options.fn(this) : options.inverse(this);
          case '&&':
              return (v1 && v2) ? options.fn(this) : options.inverse(this);
          case '||':
              return (v1 || v2) ? options.fn(this) : options.inverse(this);
          default:
              return options.inverse(this);
        }
      });
    }


    activate();

  });
})(window.jQuery, window._, window.Handlebars);;(function($, _, Handlebars, Papa, tkDataStore) {
  'use strict';

  $(function() {

    /* =========================================================================
     * [Event Her Registrations]
     * ====================================================================== */

    function activate() {
      _registerLoadQuestionModuleHandler();
      _registerChooseAnswerHandler();
      _registerMakeDecisionHandler();
    }

    function _registerLoadQuestionModuleHandler() {
      $('.js-load-question-module').on('click', function(event) {
        var $this = $(this);
        _loadQuestionModule($this.data('module'));
      });
    }

    function _registerChooseAnswerHandler() {
      $('#tk-millionarie-class').on('click', '.js-choose-answer', function(event) {
        var $this = $(this);
        var selectedAnswer = $this.data('option');
        var correctAnswer = $this.data('answer');

        if (selectedAnswer === correctAnswer) {
          $this.addClass('is-selected is-true');
        } else {
          $this.addClass('is-selected is-false');
        }
      });
    }

    function _registerMakeDecisionHandler() {
      $('#tk-millionarie-class').on('click', '.js-decision-option', function(event) {
        var $this = $(this);
        var $title = $this.closest('.js-question-set').find('.js-decision-title');
        var decision = $this.data('decision');
        var optionText = $this.data('option') || tkDataStore.decisionText[decision];

        $title.text(optionText);
        $this.siblings('.js-decision-option').hide();
      });
    }

    /* =========================================================================
     * [Event Her Functions]
     * ====================================================================== */

    function _loadQuestionModule(moduleName) {
      return _buildModule(moduleName)
        .then(function() {
          window.location.href = window.location.origin + window.location.pathname + '#/slide-ready';
        })
        .fail(function() {
          window.location.href = window.location.origin + window.location.pathname;
          console.warn('Fail loading question module <' + moduleName + '> , please try another one');
        });
    }

    /* =========================================================================
     * [Privatections]
     * ====================================================================== */

    function _buildModule(moduleName) {
      return _fetchQuestionModule(moduleName)
        .then(_parseQuestionModule)
        .then(_compileQuestionsSlides);
    }

    function _fetchQuestionModule(moduleName) {
      return $.ajax({
        url: tkDataStore.csvSource.local[moduleName],
        type: 'GET',
      })
      .then(function(csvString) {
        return {
          name: moduleName,
          csv: csvString,
        };
      })
      .fail(function() {
        console.warn('Fail loading question module <' + moduleName + '> , please try another one');
      });
    }

    function _parseQuestionModule(module) {
      tkDataStore.questionModules[module.name] = Papa.parse(module.csv, {header: true}).data;
      return {
        name: module.name,
        questions: tkDataStore.questionModules[module.name]
      };
    }

    function _compileQuestionsSlides(module) {
      var moduleTemplateName = 'module' + _.capitalize(module.name);
      var slides = _compileTemplate(moduleTemplateName, {questions: module.questions});
      $('.reveal .slides .js-question-set').remove();
      $('#slide-index').after(slides);
    }

    function _compileTemplate(templateName, model) {
      return Handlebars.compile(tkDataStore.templateSources[templateName].template)(model);
    }

    activate();
  });
})(window.jQuery, window._, window.Handlebars, window.Papa, window.tkDataStore);
