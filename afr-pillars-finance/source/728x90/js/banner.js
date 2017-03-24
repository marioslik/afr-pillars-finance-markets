$(document).ready(() => {
    FastClick.attach(document.body);
    init();
})

function init() {

    const manifest = [
        "grumpycat.jpg",
        "photo.jpg"
    ];

    preloadimages(manifest)
        .done((images) => {
            $('#preloader').hide()
            $('#banner').show()
            start();
        });
}

function start() {
    const tlx = new TimelineMax();

    tlx.to($('.frame-1'), 1, {alpha:1})
    tlx.to($('.frame-1'), 1, {alpha:0}, '2')

    tlx.to($('.frame-2'), 1, {alpha:1}, '3')
    tlx.to($('.frame-2'), 1, {alpha:0}, '5')

    tlx.to($('.frame-3'), 1, {alpha:1}, '6')
    tlx.to($('.frame-3'), 1, {alpha:0}, '8')

    tlx.to($('.frame-4'), 1, {alpha:1}, '9')
}
