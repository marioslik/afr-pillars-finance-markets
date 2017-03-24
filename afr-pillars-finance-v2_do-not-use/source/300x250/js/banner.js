var videoUrl;
var md = new MobileDetect(window.navigator.userAgent);
var isDesktop;
var playVideo = false;
var clickTag;
var bgImage01, bgImage02, bgImage03;
var bullImage, matadorImage, smokeImage, smokeBack, smokeMiddle, smokeFront;
var startDust;
var dustContainer = $('#dust-container');
var p, W, H, canvas, ctx, particleCount = 3100, particles = [];
var banner = $('#banner');

//var total=200,container=document.getElementById('dust-container'),w=300,h=250,Tweens=[],SPs=1;

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
    TweenMax.set('.arrow-circle', {autoAlpha:0, x:-10});

    // Feature images
    // =========================
    bullImage = 'bull.png';
    matadorImage = 'matador.png';
    smokeImage = 'smoke.png';
    smokeBack = 'smoke-back.png';
    smokeMiddle = 'smoke-middle.png';
    smokeFront = 'smoke-front.png';
    bgImage01 = 'skybg.jpg';




    // Copy
    // =========================


    $('.frame-2 p').html('SEEING RED');
    $('.frame-3 p').html('WHAT NEXT FOR<br>MARKET BULLS');
    $('.frame-4 p').html('TAKE STOCK OF<br>THE LEADING<br>MARKET AND<br>BUSINESS NEWS');
    $('.frame-5 p').html('TRY AFR.COM<br>FREE FOR 1 MONTH');

    $('.cta-copy').html('Find out more');

    $('.bg-image-01').attr('src', bgImage01);
    $('.bull-image').attr('src', bullImage);
    $('.matador-image').attr('src', matadorImage);
    $('.smoke-image').attr('src', smokeImage);
    $('.smoke-back').attr('src', smokeBack);
    //$('.smoke-middle').attr('src', smokeMiddle);
    $('.smoke-front').attr('src', smokeFront);








    // Clicktag
    // =========================
    clickTag  = 'http://google.com';

    // Button hover
    // =========================
    $('.button').on('mouseenter', () => {
        TweenLite.to('.arrow-circle', .2, {autoAlpha:1, x:0, ease:Power1.easeOut, overwrite:'all'});
        TweenLite.to('.cta-copy', .2, {x:-5, ease:Power1.easeOut, overwrite:'all'});
    }).on('mouseleave', () => {
        TweenLite.to('.arrow-circle', .2, {autoAlpha:0, x:-10, ease:Power1.easeOut, overwrite:'all'});
        TweenLite.to('.cta-copy', .2, {x:0, ease:Power1.easeOut, overwrite:'all'});
    })

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
        "grumpycat.jpg",
        "photo.jpg",
    ];

    preloadimages(manifest)
        .done((images) => {
            $('#preloader').hide();
            $('#banner').show();
            start();
        });
}

function start() {



      W = window.innerWidth ;
      H = window.innerHeight ;

      canvas = $("#canvas").get(0); //this "get(0) will pull the underlying non-jquery wrapped dom element from our selection
      canvas.width = W;
      canvas.height = H;

      ctx = canvas.getContext("2d"); // settng the context to 2d rather than the 3d WEBGL
      ctx.globalCompositeOperation = "lighter";
      console.log(ctx);
      var mouse = {
        x: 0,
        y: 0,
        rx:0,
        ry:0,
        speed:55,
        delta:0
      };



  document.addEventListener('mousemove', function(e){

      mouse.x = e.clientX || e.pageX;
      mouse.y = e.clientY || e.pageY;
      mouse.x-=W/2;
      mouse.y-=H/2;

  }, false);

  function randomNorm(mean, stdev) {

    return Math.abs(Math.round((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1))*stdev)+mean;
  }

  //Setup particle class
  function Particle() {
      //using hsl is easier when we need particles with similar colors
      this.h=parseInt(45);
      this.s=parseInt(40 * Math.random() + 30);
      this.l=parseInt(40 * Math.random() + 30);
      this.a=0.6*Math.random() ;

      this.color = "hsla("+ this.h +","+ this.s +"%,"+ this.l +"%,"+(this.a)+")";
      this.shadowcolor = "hsla("+ this.h +","+ this.s +"%,"+ this.l +"%,"+parseFloat(this.a-0.55)+")";



      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.direction = {
          "x": -1 + Math.random() * 5,
          "y": -1 + Math.random() * 2
      };
      //this.radius = 9 * ((Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1)+3);
      this.radius = randomNorm(3,3);
      this.scale=0.8*Math.random()+0.5;
      this.rotation=Math.PI/4*Math.random();

      this.grad=ctx.createRadialGradient( this.x, this.y, this.radius, this.x, this.y, 0 );
      this.grad.addColorStop(0,this.color);
      this.grad.addColorStop(1,this.shadowcolor);

      this.vx = (2 * Math.random() + 4)*0.01*this.radius;
      this.vy = (2 * Math.random() + 4)*0.01*this.radius;

      this.valpha = 0.01*Math.random()-0.02;

      this.move = function () {
          this.x += this.vx * this.direction.x ;
          this.y += this.vy * this.direction.y ;
          this.rotation+=this.valpha;
          //this.radius*= Math.abs((this.valpha*0.01+1));

      };
      this.changeDirection = function (axis) {
          this.direction[axis] *= -1;
          this.valpha *= -1;
      };
      this.draw = function () {
          ctx.save();
          ctx.translate(this.x+mouse.rx/-20*this.radius,this.y+mouse.ry/-20*this.radius);
        ctx.rotate(this.rotation);
        ctx.scale(1,this.scale);

          this.grad=ctx.createRadialGradient( 0, 0, this.radius, 0, 0, 0 );
          this.grad.addColorStop(1,this.color);
          this.grad.addColorStop(0,this.shadowcolor);
          ctx.beginPath();
          ctx.fillStyle = this.grad;
          ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.restore();


      };
      this.boundaryCheck = function () {
          if (this.x >= W*1.2) {
              this.x = W*1.2;
              this.changeDirection("x");
          } else if (this.x <= -W*0.2) {
              this.x = -W*0.2;
              this.changeDirection("x");
          }
          if (this.y >= H*1.2) {
              this.y = H*1.2;
              this.changeDirection("y");
          } else if (this.y <= -H*0.2) {
              this.y = -H*0.2;
              this.changeDirection("y");
          }
      };
  } //end particle class

  function clearCanvas() {
      ctx.clearRect(0, 0, W, H);
  } //end clear canvas

  function createParticles() {
      for (var i = particleCount - 1; i >= 0; i--) {
          p = new Particle();
          particles.push(p);
      }
  } // end createParticles

  function drawParticles() {
      for (var i = particleCount - 1; i >= 0; i--) {
          p = particles[i];
          p.draw();
      }


  } //end drawParticles

  function updateParticles() {
      for (var i = particles.length - 1; i >= 0; i--) {
          p = particles[i];
          p.move();
          p.boundaryCheck();

      }
  } //end updateParticles

  function initParticleSystem() {
      createParticles();
      drawParticles();
  }

  function setDelta() {
    p.now    =   (new Date()).getTime();
    mouse.delta  =   (p.now-p.then)/10000000;
    p.then   =   p.now;
  }

  function animateParticles() {
      clearCanvas();
      setDelta();
      update();
      drawParticles();
      updateParticles();
      requestAnimationFrame(animateParticles);
  }

  initParticleSystem();
  requestAnimationFrame(animateParticles);


  function update() {

  if(isNaN(mouse.delta) || mouse.delta <= 0) { return; }

  var distX   =   mouse.x - (mouse.rx),
      distY   =   mouse.y - (mouse.ry);

  if(distX !== 0 && distY !== 0) {

      mouse.rx -=  ((mouse.rx - mouse.x) / mouse.speed);
      mouse.ry -=  ((mouse.ry - mouse.y) / mouse.speed);

  }

}


  // for (var i=total;i--;){
  //   var Div=document.createElement('div');
  //   TweenMax.set(Div,{attr:{class:'dot'},x:R(w),y:R(h),opacity:0.5});
  //   container.appendChild(Div);	Anim(Div);	Tweens.push(Div);
  // };
  //
  // function Anim(elm){
  //   elm.Tween=TweenMax.to(elm,R(10)+55,{bezier:{values:[{x:R(w),y:R(h)},{x:R(w),y:R(h)}]},opacity:R(0.8),scale:R(1)+0.5,delay:R(5),onComplete:Anim,onCompleteParams:[elm]})
  // };
  //
  // function R(max){return Math.random()*max};
  //
  //
  //
  // function startDust(){
  //   if(SPs){for(var i=total;i--;){Tweens[i].Tween.pause()}; SPs=0;}
  //   else{for(var i=total;i--;){Tweens[i].Tween.play()}; SPs=1;}
  // };
  //
  // window.addEventListener("resize",resize);
  // function resize(){w=window.innerWidth;  h=window.innerHeight;};
  //
  // startDust();

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

    var tlBull = new TimelineMax();
    var tlBull2 = new TimelineMax();

    var tlMatador = new TimelineMax();
    var tlMatador2 = new TimelineMax();

    var tlSmoke = new TimelineMax();

    function slowBull(){
        tlBull.to('#bull', 3.5, {x:"+=5", y:"+=15"});
    }

    function slowBull2(){
        tlBull2.to('#bull', 3.5, {x:-8, y:-12});
    }

    function slowMatador(){
        tlMatador.to('#matador', 3, {x:"-=10", y:"+=10"});
    }

    function slowMatador2(){
        tlMatador2.to('#matador', 3, {x:85, y:-195});
    }

    function animateSmoke(){
        TweenMax.to('.smoke-back', 30, {x:300});
        // TweenMax.to('.smoke-middle', 50, {x:-600});
        //TweenMax.to('.smoke-front', 100, {x:-400});
    }

    function stopSmokeAnimation(){
        TweenMax.killTweensOf('.smoke-back');
        // TweenMax.killTweensOf('.smoke-middle');
        //TweenMax.killTweensOf('.smoke-front');
    }


    function featureAnimation() {
        tlFeature.set('.feature', {x:0})
                 .set('.dg.ac', {display:"none"})
                 .call(slowBull, [], this, "")
                 .call(slowMatador, [], this, "")
                 .call(animateSmoke, [], this, "")


                .to('#bull', 1.25, {ease:Power1.easeInOut, x:-9, y:-12, scale:0.7, delay:4.25})
                .to('#matador', 1.25, {ease:Power1.easeInOut, x:89, y:-199, scale:0.55, rotation:0}, "-=1.3")
                .to('.matador-image', 1.25, {ease:Power1.easeInOut, 'webkitFilter': 'blur(0px)'}, "-=1.25")
                .to('#canvas', 1.25, {ease:Power1.easeInOut, 'webkitFilter': 'blur(0px)', scale:1}, "-=1.25")
                .add("Bull2")
                .add("Matador2")
                .call(slowBull2, [], this, "Bull2")
                .call(slowMatador2, [], this, "Matador2")

                .to('.feature', 1.5, {ease:Power1.easeInOut, y:102, autoAlpha:0, delay:3})
                .to('.smoke-container', 1.5, {ease:Power1.easeInOut, y:102, autoAlpha:0}, "-=1.5")
                .to('#canvas', 1.5, {ease:Power1.easeInOut, autoAlpha:0}, "-=1.5")
                .add('endOfFeature')
                .call(stopSmokeAnimation, [], this, "endOfFeature")
                .set('.dot', {display:"none", opacity:0, x:-1000, y:-1000, scale:0}, "endOfFeature")

                 ;
        }


    const tl = new TimelineMax();



    tl.set('#canvas', {scale:1.5, 'webkitFilter': 'blur(0px)', alpha:1})
      .set('#fr-logo-intro', {opacity:1})
      .set('.feature', {y:-176})
      .set('.smoke-back', {alpha:0.5, x:-300, y:-20})
      .set('.smoke-middle', {display:"none",alpha:0.3, y:-30})
      .set('.smoke-front', {display:"none", alpha:0.9, y:-20, x:20})
      .set('.matador-image', {'webkitFilter': 'blur(4px)'})
      .set('#matador', {x:150, y:-130, scale:0.8, rotation:-10, transformOrigin:"0% 100%"})
      //.call(startDust, [], this, "")
      //.set('.splitLines', {alpha:0})
      .to('.panel-01', 1.6, {y:250, ease:Power1.easeInOut})
      .to('.panel-02', 1.1, {y:195, ease:Power1.easeInOut, backgroundColor:"#ffffff", opacity:1, onComplete: () => {
          TweenMax.set('.panel-01', {y:-250}); // Reset the panels

      }}, '-=1.1')
      .to('#fr-logo-intro', 1.1, {ease:Power1.easeInOut, top:"209px"}, "-=1.1")
      .to('#tag-line-intro', 1.1, {ease:Power1.easeInOut, opacity:0}, "-=1.1")
      .to('#logo-lockup-intro .fr-logo-path', 0.5, {ease:Power1.easeInOut, fill:"#1289ca"}, "-=0.85")
      .call(featureAnimation, [], this, "-=0.5")

      .staggerFrom('.frame-2 p .splitLines', 0.8, {y:-30, alpha:0, ease:Power1.easeInOut}, -0.08, "-=0.1")
      .staggerTo('.frame-2 p .splitLines', 0.8, {y:40, alpha:0, ease:Power1.easeInOut, delay:1.5}, -0.08)

      .staggerFrom('.frame-3 p .splitLines', 0.8, {y:-30, alpha:0, ease:Power1.easeInOut}, -0.08, "-=0.1")
      .staggerTo('.frame-3 p .splitLines', 0.8, {y:30, alpha:0, ease:Power1.easeInOut, delay:3.5}, -0.08)

      .staggerFrom('.frame-4 p .splitLines', 0.8, {y:-30, alpha:0, ease:Power1.easeInOut}, -0.08)
      .staggerTo('.frame-4 p .splitLines', 0.8, {y:0, alpha:0, ease:Power1.easeInOut, delay:2}, 0.01)

      .staggerFrom('.frame-5 p .splitLines', 0.8, {y:30, alpha:0, ease:Power1.easeInOut}, 0.08)


      .from('.button', 0.8, {alpha:0, y:20, ease:Power1.easeOut}, "-=0.2")
      .to('.panel-02', 1, {y:170, ease:Power1.easeInOut}, "-=1.3")
      .to('#fr-logo-intro', 1, {y:-21, ease:Power1.easeInOut}, "-=1")
      .to('#tag-line-intro', 1, {ease:Power1.easeInOut, opacity:1}, "-=1")
      .to('#tag-line-intro .fr-logo-path', 1, {ease:Power1.easeInOut, fill:"#1289ca"}, "-=1")
      .from('#tag-line', 1, {alpha:0, ease:Power1.easeOut}, 'endFrame+=1')

      ;






    // Testing
    // =========================
    // tl.pause(8)


    let name = `andrew`
    const surname = `asdfasdf`
    //alert(`sup ${name} ${surname}`)
}
