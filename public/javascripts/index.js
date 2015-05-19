/**
 * Created by huangxinghui on 2015/5/2.
 */

$(document).ready(setTimeout(function() {
    $.get('/javascripts/little_bean_profile.json').then(function (data) {
        $('.media-image').magnificPopup({
            items: data.timeline.date.map(function (item) {
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
                titleSrc: function(item) {
                    return item.title + '<small>by huangxinghui</small>';
                }
            }
        });
    });
}, 2000));

// baidu tongji
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?62d0cf1cf935cded759f51d28b5ccb74";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();