(function(_) {
  'use strict';

  var tkDataStore = window.tkDataStore = window.tkDataStore || {};

  // var googleDriveCsvUrl = 'https://docs.google.com/spreadsheets/d/1HnqeQtNhuqWvEJau5VINIn4DhivCSvLD5C3w4dLz5TA/pub?gid=0&single=true&output=csv';

  tkDataStore.moduelSource = {
    local: {
      low: 'data/low.csv',
      medium: 'data/medium.csv',
      high: 'data/high.csv',
      asia: 'data/asia.csv',
      europe: 'data/europe.csv',
      africa: 'data/africa.csv',
      southAmerica: 'data/south-america.csv',
      northAmerica: 'data/north-america.csv',
    },
    cloud: {
      low: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6Ys9Vw3rraPDmCeWave1xpovF1YBayV0FbRPBg-iuh2DBkjj84P7D31OthaHTG3uLWkXblccZ5qhA/pub?output=csv',
      medium: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vREStPvytLV1CMGf0aeMzozI3mpVnU5tSPV8phELKq4VdKD7jMdsWmsR8n203rq-FMIPxdgUA-VCUSv/pub?output=csv',
      high: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQLXta4ldz5NnndUF5p92SxcnOSvM5SO9Nk3_TQq2ZHEDkCSnARB1UUppJ3tiucJ0gjfW2tMGzhxbct/pub?output=csv',
      asia: 'xxx',
      europe: 'xxx',
      africa: 'xxx',
      southAmerica: 'xxx',
      northAmerica: 'xxx',
    }
  };

  tkDataStore.questionModules = {
    basic: {},
    advanced: {},
    asia: {},
    europe: {},
    africa: {},
    southAmerica: {},
    northAmerica: {},
  };

  tkDataStore.decisionText = {
    yes: '你真了不起',
    no: '再接再厲吧',
  };

  tkDataStore.config = {
    title: '',
    source: 'cloud',
    player: '1',
    timer: 60,
  };

  tkDataStore.soundEffectSource = {
      applause: 'http://www.soundjay.com/human/applause-01.mp3',
      success: 'http://www.soundjay.com/misc/dream-harp-02.mp3',
      fail: 'http://www.soundjay.com/misc/fail-trombone-02.mp3',
      screaming: 'http://www.soundjay.com/human/man-screaming-01.mp3',
      laser: 'http://www.soundjay.com/button/button-3.mp3',
      handsaw: 'http://www.soundjay.com/mechanical/handsaw-1.mp3',
  };

  tkDataStore.soundEffect = {
    applause: new Audio(tkDataStore.soundEffectSource.applause),
    success: new Audio(tkDataStore.soundEffectSource.success),
    fail: new Audio(tkDataStore.soundEffectSource.fail),
    screaming: new Audio(tkDataStore.soundEffectSource.screaming),
    laser: new Audio(tkDataStore.soundEffectSource.laser),
    handsaw: new Audio(tkDataStore.soundEffectSource.handsaw),
  };

})(window._);
