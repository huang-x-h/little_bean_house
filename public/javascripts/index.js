/**
 * Created by huangxinghui on 2015/5/2.
 */

$(document).ready(function () {
    var profileData, showPopup = false;

    $.get('/javascripts/little_bean_profile.json').then(function (data) {
        profileData = data;
        createStoryJS({
            type: 'timeline',
            width: "100%",
            height: "100%",
            start_at_end: true,
            source: profileData,
            embed_id: 'timeline-embed'
        });
    });

    $(document).on('click', 'img', function (e) {
        if (showPopup) return;

        showPopup = true;
        $('.media-image').magnificPopup({
            items: profileData.timeline.date.map(function (item) {
                return {
                    src: item.asset.media,
                    title: item.text
                }
            }),
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.title + '<small>by huangxinghui</small>';
                }
            },
            callbacks: {
                close: function () {
                    showPopup = false;
                }
            }
        });
    });
});

// baidu tongji
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?62d0cf1cf935cded759f51d28b5ccb74";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

// google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q || []).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-3536928-2', 'auto');
ga('send', 'pageview');