var videoUrl;
//var md = new MobileDetect(window.navigator.userAgent);
var isDesktop;
var playVideo = false;
var clickTag;
var bgImage01, bgImage02, bgImage03;
var featureImage, houseImage, roofImage, treeImage;

// Banner timings
var timingValues;
var frame01, frame02, frame03, frame04, frame05;

$(document).ready(() => {
    FastClick.attach(document.body);
    init();
})

function init() {

    // Init CSS
    // =========================
    TweenMax.set('.logo-container', {y:26});
    TweenMax.set('.cta-arrow', {rotation:45, transformOrigin:'50% 50%'});
    TweenMax.set('.panel-03', {x:-300});
    TweenMax.set('.panel-04', {x:-300});
    TweenMax.set('.panel-05', {x:-300});
    TweenMax.set('.graph-line', {scaleX:0});
    TweenMax.set('#fr-logo-intro', {opacity:1});
    TweenMax.set('#bull-horns', {drawSVG:"0%", immediateRender:false});
    TweenMax.set('#bull-bottom', {drawSVG:"0%", immediateRender:false});
    TweenMax.set('#bull-extra', {drawSVG:"0%", immediateRender:false});

    // Feature images
    // =========================
    bgImage01 = 'skybg.jpg';

    // Copy
    // =========================


    $('.frame-2 p').html('MARKET BULLS<br>CHARGE AHEAD');
    $('.frame-3 p').html('GLOBAL MARKETS<br>TAKE SHAPE');
    $('.frame-4 p').html('MASTER THE<br>MARKETS<br>WITH THE AFR');
    $('.frame-5 p').html('TRY THE AFR<br>FREE FOR 1 MONTH');

    $('.cta-copy').html('Find out more');

    $('.bg-image-01').attr('src', bgImage01);
    $('.feature-image').attr('src', featureImage);
    $('.house').attr('src', houseImage);
    $('.roof').attr('src', roofImage);
    $('.tree').attr('src', treeImage);



    // Clicktag
    // =========================
    clickTag  = 'http://google.com';

    $('#banner').on('click', () => {
        console.log('clicktag invoked');
        window.open(window.clickTag);
    })

    // Timing values
    // =========================
    timingValues = '1,3,7,10,13';
    timingValues = timingValues.split(',');

    frame01 = timingValues[0];
    frame02 = timingValues[1];
    frame03 = timingValues[2];
    frame04 = timingValues[3];
    frame05 = timingValues[4];

    const manifest = [
        "skybg.jpg"
    ];

    preloadimages(manifest)
        .done((images) => {
            $('#preloader').hide();
            $('#banner').show();
            start();
        });
}

function start() {

    // Split text
    // =========================

    var $messaging01 = $(".frame-2 p"),
    mySplitText01 = new SplitText($messaging01, {type:"words"});
    mySplitText01.split({type:"lines, chars, words", linesClass:"splitLines"});

    var $messaging02 = $(".frame-3 p"),
    mySplitText02 = new SplitText($messaging02, {type:"words"});
    mySplitText02.split({type:"lines, chars, words", linesClass:"splitLines"});

    var $messaging03 = $(".frame-4 p"),
    mySplitText03 = new SplitText($messaging03, {type:"words"});
    mySplitText03.split({type:"lines, chars, words", linesClass:"splitLines"});

    var $messaging04 = $(".frame-5 p"),
    mySplitText04 = new SplitText($messaging04, {type:"words"});
    mySplitText04.split({type:"lines, chars, words", linesClass:"splitLines"});

    var tlFeature = new TimelineMax();

    function featureAnimation() {
        tlFeature.staggerTo('#graph-lines .graph-line', 1, {ease:Power1.easeInOut, scaleX:1}, 0.05)
                 .to('#bull-horns .cls-1', 1.3, {ease:Power1.easeInOut, drawSVG:"0% 100%"}, "+=0.0")
                 .to('#bull-bottom .cls-1', 1.3, {ease:Power1.easeInOut, drawSVG:"0% 100%"}, "-=0.4")
                 .to('#bull-extra1', 0.75, {ease:Power1.easeInOut, drawSVG:"0% 100%"}, "+=0.5")
                 .add("endOfLine")
                 .to('#bull-extra2', 0.5, {ease:Power1.easeInOut, drawSVG:"0% 100%"}, "endOfLine")
                 ;
        }


    const tl = new TimelineMax();



    tl
      .to('.panel-01', 1.6, {y:250, ease:Power1.easeInOut})
      .to('.panel-02', 1.1, {y:195, ease:Power1.easeInOut, backgroundColor:"#ffffff", opacity:1, onComplete: () => {
          TweenMax.set('.panel-01', {y:-250}) // Reset the panels

      }}, '-=1.1')
      .to('#fr-logo-intro', 1.1, {ease:Power1.easeInOut, top:"209px"}, "-=1.1")
      .to('#tag-line-intro', 1.1, {ease:Power1.easeInOut, opacity:0}, "-=1.1")
      .to('#logo-lockup-intro .fr-logo-path', 0.5, {ease:Power1.easeInOut, fill:"#1289ca"}, "-=0.85")
      .call(featureAnimation, [], this, "-=0.9")

      .staggerFrom('.frame-2 p .splitLines', 0.8, {y:-30, alpha:0, ease:Power1.easeInOut}, -0.08, "-=0.1")
      .staggerTo('.frame-2 p .splitLines', 0.8, {y:40, alpha:0, ease:Power1.easeInOut, delay:2}, -0.08)

      .staggerFrom('.frame-3 p .splitLines', 0.8, {y:-30, alpha:0, ease:Power1.easeInOut}, -0.08)
      .staggerTo('.frame-3 p .splitLines', 0.8, {y:30, alpha:0, ease:Power1.easeInOut, delay:1.5}, -0.08)
      .add('frame04', "-=0.8")


      .to('.panel-05', 1.6, {x:0, ease:Power1.easeInOut}, 'frame04')
      .to('.panel-04', 1.3, {x:0, ease:Power1.easeInOut}, 'frame04+=.3')
      .to('.panel-03', 1.1, {x:0, ease:Power1.easeInOut}, 'frame04+=.5')
      .staggerFrom('.frame-4 p .splitLines', 0.8, {y:30, alpha:0, ease:Power1.easeInOut}, 0.08, 'frame04+=1')
      .staggerTo('.frame-4 p .splitLines', 0.8, {y:-30, alpha:0, ease:Power1.easeInOut, delay:1.5}, 0.08)

      .staggerFrom('.frame-5 p .splitLines', 0.8, {y:30, alpha:0, ease:Power1.easeInOut}, 0.08)


      .from('.button', 0.8, {alpha:0, y:20, ease:Power1.easeOut}, "-=0.2")
      .to('.panel-02', 1, {y:170, ease:Power1.easeInOut}, "-=1.3")
      .to('#fr-logo-intro', 1, {y:-21, ease:Power1.easeInOut}, "-=1.3")
      .to('#tag-line-intro', 1, {ease:Power1.easeInOut, opacity:1}, "-=1.3")
      .to('#tag-line-intro .fr-logo-path', 1, {ease:Power1.easeInOut, fill:"#1289ca"}, "-=1.3")
      .from('#tag-line', 1, {alpha:0, ease:Power1.easeOut}, 'endFrame+=1')

      ;






    // Testing
    // =========================
    //tl.pause(6)


}
