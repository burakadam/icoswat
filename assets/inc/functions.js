var processSlider = $("#process__slider");
var poweredSlider = $("#powered__slider");
var videoSlider = $("#video_slider");
var serviceSlider = $('.service__container');
var teamSlider = $('#team__leaders_box');
var teamDataSlider = $("#team_mobile_data_slider");
var processTextSlider = $("#process__text__slider");
var playList = [];
var wresize = false;
var ww = window.innerWidth;
var loadSlide = false;
var scrollingV = false;
var md = new MobileDetect(window.navigator.userAgent);
var isMobile = md.mobile() === null ? false : true;
var activeBannerCount = 0;
var htmlScrollTop = 0;
var menuSetted = false;
var bannerInt;
var serviceAnmiteCall = false;
var sbx;
//test
var result = true;
//test

$(function () {


    $(window).on("resize", function () {
        ww = window.innerWidth;
        checkSlider();
        setElements();
    });

    $(document).ready(function () {

        sbx = window.innerWidth < 481 ? $(".service__container .owl-dots").visible(true) : $(".service__box_text").eq(0).visible();
        checkSlider();
        setElements();

        if (!serviceAnmiteCall && sbx) {
            serviceAnmiteCall = true;
            setServiceAnimate();
        }

        $("html").removeClass("loading");

        processSlider.owlCarousel({
            items: 4,
            smartSpeed: 250,
            onInitialized: function () {
                processSlider.append($("#process__bar"))
            },
            responsive: {
                0: {
                    items: 1,
                    dots: true
                },
                480: {
                    items: 1,
                    dots: true
                },
                620: {
                    items: 4
                }
            }
        });

        //4 iteml� hali
        //poweredSlider.owlCarousel({
        //    items: 4,
        //    smartSpeed: 250,
        //    nav: true,
        //    responsive: {
        //        0: {
        //            items: 3,
        //            center: true,
        //            startPosition: 1,
        //            nav: true,
        //            dots: true
        //        },
        //        480: {
        //            items: 3,
        //            center: false,
        //            nav: true,
        //            dots: false
        //        },
        //        805: {
        //            items: 3,
        //            center: false,
        //            nav: true,
        //            dots: false
        //        }
        //    },
        //    navText: ['<svg  width="21px" height="38px"><path fill-rule="evenodd"  stroke="rgb(0, 0, 0)" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M1.999,2.005 L18.003,18.503 L1.999,35.001 "/></svg>', '<svg  width="21px" height="38px"><path fill-rule="evenodd"  stroke="rgb(0, 0, 0)" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M1.999,2.005 L18.003,18.503 L1.999,35.001 "/></svg>']
        //});


        poweredSlider.owlCarousel({
            items: 3,
            smartSpeed: 250,
            nav: true,
            responsive: {
                0: {
                    items: 3,
                    center: true,
                    startPosition: 1,
                    nav: true,
                    dots: true
                },
                481: {
                    items: 2,
                    center: false,
                    nav: true,
                    dots: false
                },


                667: {
                    items: 3,
                    center: false,
                    nav: true,
                    dots: false
                }
            },
            navText: ['<svg  width="21px" height="38px"><path fill-rule="evenodd"  stroke="rgb(0, 0, 0)" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M1.999,2.005 L18.003,18.503 L1.999,35.001 "/></svg>', '<svg  width="21px" height="38px"><path fill-rule="evenodd"  stroke="rgb(0, 0, 0)" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M1.999,2.005 L18.003,18.503 L1.999,35.001 "/></svg>']
        });


        videoSlider.owlCarousel({
            items: 1,
            lazyLod: true,
            smartSpeed: 250,
            nav: true,
            center: true,
            startPosition: 0,
            margin: 10,
            center: true,
            navText: ['<svg  width="21px" height="38px"><path fill-rule="evenodd" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M1.999,2.005 L18.003,18.503 L1.999,35.001 "/></svg>', '<svg  width="21px" height="38px"><path fill-rule="evenodd" stroke-width="2px" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M1.999,2.005 L18.003,18.503 L1.999,35.001 "/></svg>'],
            onInitialized: function () {
                //playVideo($("#video_slider .center"));
            },
            responsive: {

                950: {
                    items: 2
                }
            }

        });




        videoSlider.on('changed.owl.carousel', function (event) {

            if ($("#video_slider .center iframe").length && $("html").hasClass("video-open")) {
                var jqueryPlayer = new Vimeo.Player($("#video_slider .center iframe"));
                jqueryPlayer.pause();
                playVideo($(".video_player").eq(event.page.index))
            }

        });

        serviceSlider.on('dragged.owl.carousel', function (event) {
            if (ww < 481) {
                if (event.relatedTarget._drag.direction == "left") {

                }

            }
        });

        teamSlider.on('dragged.owl.carousel', function (event) {
            teamDataSlider.trigger('to.owl.carousel', event.item.index);
        });

        teamDataSlider.on('dragged.owl.carousel', function (event) {
            teamSlider.trigger('to.owl.carousel', event.item.index);
        });

        processTextSlider.on('dragged.owl.carousel', function (event) {
            processSlider.trigger('to.owl.carousel', event.item.index);
            $(".process__text__box").removeClass("selected");
            $("#process__text__slider .owl-item.active").find(".process__text__box").addClass("selected");
        });

        processSlider.on('dragged.owl.carousel', function (event) {
            processTextSlider.trigger('to.owl.carousel', event.item.index);
            $(".process__text__box").removeClass("selected");
            $("#process__text__slider .owl-item.active").find(".process__text__box").addClass("selected");
        });



    });

    $(".menu-toggle").on("click", function () {


        menuSetted = $(".menu").hasClass("opened") ? false : true;

        $(".menu").toggleClass("opened");
        var mo = $("html").hasClass("mobile_menu") ? false : true;
        setHtml("mobile_menu", mo);

    });

    $(".powered__video_box").on("click", function () {
        setHtml("video-open", true);
        $("#modal_video").removeClass("disabled");
        var bx = $(this);
        var vid = bx.attr("data-video");

        var inx = $("#video_slider [data-video=" + vid + "]").parents(".owl-item").index()
        videoSlider.trigger('to.owl.carousel', [inx, 0]);
        setTimeout(function () {
            playVideo($(".video_player").eq(inx))
        }, 450)

    });

    $(".process_step").on("click", function () {
        var b = $(this);
        var dt = $(this).attr("data-type");
        var elem = $("#process__text__slider > div[data-type=" + dt + "]");

        elem.siblings().removeClass("selected");
        setTimeout(function () {
            elem.addClass("selected");
        }, 450);

        var prnt = b.parent(".owl-item");

        var dif = $(".process_step").outerWidth() - $(".process_step_icon").outerWidth();
        var distance = (($("#process__bar").outerWidth() + dif) * ((prnt.index() + 1) / 4)) - (32.5 + (dif / 2))

        $("#process__slider .selected").removeClass("selected");
        $("#process_width").css("width", distance);
        b.addClass("selected focused").parent(".owl-item").prevAll().find(".process_step").addClass("focused");
        b.parent(".owl-item").nextAll().find(".process_step").removeClass("focused");

    });

    $(".btn").on("click", function () {
        setHtml("menu-open", true);

        $("#form_box").show();

        setTimeout(function () {
            $("#form_box").addClass("selected");
        }, 350);
    });

    $("#modal .close-modal").on("click", function () {

        $("#modal .selected").removeClass("selected");
        $("#form_result,#form_box,#form_result__succes").removeClass("shown hidden");
        setTimeout(function () {
            $("#modal > div:not(.close-modal)").hide();
            setHtml("menu-open", false);
        }, 350);
    });

    $("#modal_video .close-modal").on("click", function () {
        $("#modal_video").addClass("disabled");

        $("#video_slider .center iframe").each(function () {
            var jqueryPlayer = new Vimeo.Player($(this));
            jqueryPlayer.pause();
        });

        setHtml("video-open", false);
    })

    $("nav a").on("click", function (e) {
        e.preventDefault();

        var trg = $(this).attr("data-sec");
        $("body, html").stop().animate({ scrollTop: ($("#" + trg).offset().top - $("header").outerHeight()) }, 450);
        $("nav a.active").removeClass("active");
        $(this).addClass("active");
        $(".menu").removeClass("opened");

        setHtml("mobile_menu", false)
    });



    $(window)
        .on("scrollstart", function (e) {
            scrollingV = true;
        })
        .on("scrollstop", function () {
            scrollingV = false;
        })
        .on("scroll", function (e) {

            $(".section").each(function () {
                var t = $(this);
                var vs = isMobile ? t.visible(true) : t.visible()
                if (vs && !$("html").hasClass(" mobile_menu") && !menuSetted) {
                    var tId = t.attr("id");
                    $("nav a[data-sec=" + tId + "]").addClass("active").siblings().removeClass("active");

                }
            });


            sbx = window.innerWidth < 481 ? $(".service__container .service__icon.make").visible(true) : $(".service__box_text")
                .eq(0)
                .visible();;
            if (sbx && !serviceAnmiteCall) {
                serviceAnmiteCall = true;
                setServiceAnimate();

            }
        });




    $("select").each(function () {
        $(".ph").show();
        if (!isMobile) {
            $(".ph").hide();
            var $this = $(this),
                numberOfOptions = $(this).children("option").length;

            $this.addClass("s-hidden");
            $this.wrap('<div class="select"></div>');
            $this.after('<div class="styledSelect"></div>');

            var $styledSelect = $this.next("div.styledSelect");

            $styledSelect.html("<p>" + $this.attr("data-placeholder") + "</p>");

            var $list = $("<ul />", {
                class: "options"
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $("<li />", {
                    text: $this.children("option").eq(i).text(),
                    rel: $this.children("option").eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children("li");

            $styledSelect.click(function (e) {

                e.stopPropagation();
                $("div.styledSelect.active").each(function () {
                    $(this).removeClass("active").next("ul.options").hide();
                });
                $(this).toggleClass("active").next("ul.options").toggle();

            });

            $listItems.click(function (e) {

                e.stopPropagation();
                $this.parents(".formsection").removeClass("error");
                $styledSelect.text($(this).text()).removeClass("active");
                $this.val($(this).attr("rel"));
                $list.hide();

            });

            $(document).click(function () {
                $styledSelect.removeClass("active");
                $list.hide();
            });
        }
    });


    $("select").on("change", function () {
        var s = $(this);
        if (s.find("option:selected").val() !== "") {
            s.parents(".formsection").find(".ph").hide();
            s.addClass("selected");
        } else {
            s.parents(".formsection").find(".ph").show();
            s.removeClass("selected");
        }


    });


    $("#form_submit_btn").on("click", function () {
        var dt = {};
        var sec = $(".formsection");

        sec.each(function () {
            var b = $(this);
            var elem = b.find("> *:not(.ph)");

            switch (elem.prop("nodeName")) {
                case "INPUT": {
                    var typ = elem.hasClass("email") ? emailControl(elem.val()) : true;

                    if (elem.val() == "" && elem.attr("required") || !typ) {
                        b.addClass("error");
                    } else {
                        dt[elem.attr("name")] = elem.val();
                    }
                    break;
                }

                case "TEXTAREA": {
                    if (elem.val() == "" && elem.attr("required")) {
                        b.addClass("error");
                    } else {
                        dt[elem.attr("name")] = elem.val();
                    }
                    break;
                }
                case "SELECT": {
                    if (elem.find("option:selected").val() == "" && elem.attr("required")) {
                        elem.parent(".formsection").addClass("error");
                    } else {
                        dt[elem.find("select").attr("name")] = elem
                            .find("select option:selected")
                            .val();
                    }
                    break;
                }
                case "DIV": {
                    switch (elem.attr("class")) {
                        case "select": {
                            if (elem.find("select option:selected").val() == "" && elem.find("select").attr("required")) {
                                elem.parent(".formsection").addClass("error");
                            } else {
                                dt[elem.find("select").attr("name")] = elem
                                    .find("select option:selected")
                                    .val();
                            }

                            break;
                        }
                    }
                    break;
                }
                default: {
                }
            }
        });

        if ($("#form_box .error").length) {
            $("#modal").stop().animate({ scrollTop: $(".error").eq(0).offset().top });
        } else {
            console.log(dt);
            $("#form_result").show().addClass("shown");
            $("#form_box").addClass("hidden");
            if (result) {

                $("#form_result__succes").show().addClass("shown");
            } else {
                $("#form_result__error").show().addClass("shown");
            }
        }

    });

    $("#form_result__success_btn").on("click", function () {
        $("#form_result,#form_box,#form_result__succes").removeClass("shown hidden");
        $("#modal .close-modal").click();
        $(".form_result__box").hide();

    });

    $("#form_result__error_btn").on("click", function () {
        $("#form_result__error,#form_result,#form_box").removeClass("shown hidden");
        $(".form_result__box").hide();
    });

    $("#file-upload").on("change", function () {
        var f = $(this)[0].files[0];
        console.log($(this)[0].files);

        $("#file_box").addClass("uploaded").find("p").text(f.name);

    });

    $(document).on("click", "#file_box svg", function () {
        $(this)[0].value = "";
        $("#file_box")
            .removeClass("uploaded")
            .find("p")
            .text("");
    });

    $(document).on("click", ".error", function () { $(this).removeClass("error") })

});



function setServiceAnimate() {

    boxAnimate();

    function boxAnimate() {
        $(".service__box").addClass("animated");
        setTimeout(function () {
            childrenAnimate();
        }, 150);
    }

    function childrenAnimate() {
        if (ww < 481) {
            $(".service__box")
                .find("[data-animated=true]")
                .addClass("animated");
        } else {
            var elemt = $(".service__box").find("[data-animated=true]");

            setTimeout(function () {
                elemt.each(function () {
                    var p = $(this);
                    p.addClass("animated");
                });
            }, 300);
        }
    }
}

function setHtml(cs, addCls) {
    var sb = getScrollBarWidth();
    var acElem = $("nav a.active");
    if (addCls) {
        htmlScrollTop = $(window).scrollTop()
        $("html").addClass(cs);
        $("html").css("padding-right", sb);


    } else {
        $("html").removeClass(cs);
        $("html").css("padding-right", 0);

    }

    if (isMobile) {
        window.scrollTo(0, htmlScrollTop)
    } else {
        $("html,body").scrollTop(htmlScrollTop);
    }
    acElem.eq(acElem.length - 1).addClass("active").siblings().removeClass("active");
}

function playVideo(elem) {
    var vv = elem.width();
    var video = elem.find(".video_set");
    var vid = parseInt(video.attr("data-video"));


    elem.find(".video_player").removeClass("empty");

    var options = {
        id: vid,

        loop: true
    };

    var player = new Vimeo.Player(video, options);

    $(player).push(playList)

    player.play();
    player.ready().then(function () {
        elem.parents(".video_slide").find(".video_player").removeClass("empty");
    });


}

function getScrollBarWidth() {

    if ($(document).height() > $(window).height()) {
        var inner = document.createElement('p');
        inner.style.width = "100%";
        inner.style.height = "200px";

        var outer = document.createElement('div');
        outer.style.position = "absolute";
        outer.style.top = "0px";
        outer.style.left = "0px";
        outer.style.visibility = "hidden";
        outer.style.width = "200px";
        outer.style.height = "150px";
        outer.style.overflow = "hidden";
        outer.appendChild(inner);

        document.body.appendChild(outer);
        var w1 = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        var w2 = inner.offsetWidth;
        if (w1 == w2) w2 = outer.clientWidth;

        document.body.removeChild(outer);

        return (w1 - w2);
    } else {
        return (0);
    }

};

function checkSlider() {


    if (ww < 621) {
        processTextSlider.addClass('owl-carousel');
        processTextSlider.owlCarousel({
            items: 1,
            smartSpeed: 250,
            autoHeight: true,
            onInitialized: function () {
                var ind = processTextSlider.find(".selected").index();
                processSlider.trigger('to.owl.carousel', ind);
                processTextSlider.trigger('to.owl.carousel', ind);
            }
        });
    } else {
        if (processTextSlider.hasClass('owl-carousel')) {
            processTextSlider.owlCarousel('destroy');
            processTextSlider.removeClass("owl-carousel")
        }

    }


    if (ww < 481) {

        if (!loadSlide) {
            loadSlide = true;
            serviceSlider.addClass('owl-carousel');
            serviceSlider.owlCarousel({
                items: 3,
                dots: true,
                center: true,
                startPosition: 1,
                smartSpeed: 250,
            });

            teamSlider.addClass('owl-carousel');
            teamSlider.owlCarousel({
                items: 3,
                center: true,
                startPosition: 1,
                smartSpeed: 250,

            });

            teamDataSlider.addClass('owl-carousel');
            teamDataSlider.owlCarousel({
                items: 1,
                dots: true,
                startPosition: 1,
                smartSpeed: 250,
                margin: 150
            });


        }



    }
    if (ww > 481) {

        if (loadSlide) {

            loadSlide = false;
            serviceSlider.owlCarousel('destroy');
            teamSlider.owlCarousel('destroy');

            $("#team__leaders_box .team__leader").removeAttr("style");
            $(".service__container .service__box").removeAttr("style");
        }




    }
}

function setElements() {

    if (isMobile) {
        $("html").addClass("mobile");
    }
    ww = window.innerWidth;
    if (ww < 481) {
        setBannerSlide();
    } else {
        clearTimeout(bannerInt);
    }

    $(".video_slide").css("height", $(window).outerHeight());
    $("#team__leaders_box .owl-stage-outer").css("margin-left", -(($("#team__leaders_box .team__leader_image").outerWidth() - $("#team__leaders_box .owl-item.active").outerWidth())) / 2);
    $(".service__container .service__box").css("margin-left", -(($(".service__container .service__box").outerWidth() - $(".service__container .owl-item.active").outerWidth())) / 2);



}

var animTime = 2500;
function setBannerSlide() {
    clearTimeout(bannerInt);
    bannerInt = setTimeout(function () {

        var slideElem = $(".slide_elem.active"),
            slideElemNext = slideElem.next().length == 0 ? $(".slide_elem").eq(0) : slideElem.next();

        console.log(slideElem, slideElemNext);

        slideElemNext.addClass("active");
        slideElem.hide().removeClass("active").show();

        setBannerSlide();
    }, animTime);


}
