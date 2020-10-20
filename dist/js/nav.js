// 处理首页导航栏部分

define(["jquery"],function($){
    function download(){
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function(result){
                var bannerArr = result.banner;
                for(var i=0; i<bannerArr.length; i++){
                    $(`<a href='${bannerArr[i].url}'>
                    <img class = 'swiper-lazy swiper-lazy-loaded' src = './images/banner/${bannerArr[i].img}' alt=''
                    </a>`).appendTo("#J_homeSwiper .swiper-slide");

                    var node = $(`<a href="#" class = 'swiper-pagination-bullet'></a>`);
                    if(i==0){
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination");

                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function banner(){
        var iNow = 0;
        var aImgs = null;
        var aBtns = null;

        var timer = setInterval(function(){
            iNow++;
            tab();
        },2500)

        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2500)
        })

        $("#J_homeSwiper .swiper-pagination").on("click","a",function(){
            iNow = $(this).index();
            tab();
        })

        $(".swiper-button-prev").click(function(){
            iNow--;
            tab();
        })

        $(".swiper-button-next").click(function(){
            iNow++;
            tab();
        })

        function tab(){
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if(!aBtns){
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if(iNow==aImgs.length){
                iNow = 0;
            }
            if(iNow<0){
                iNow = aImgs.length - 1;
            }
            aImgs.hide().css({"display":"none","opacity":"0.2"}).eq(iNow).show().animate({"display":"block","opacity":"1"},500);
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }
    }

    function leftDownload(){
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function(result){
                var sideArr = result.sideNav;
                for(var i=0; i<sideArr.length; i++){
                    var node = $(`<li class = 'category-item'><a href="#" class = 'title'>
                        ${sideArr[i].title}
                        <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                            
                        </div>
                    </li>`);
                    node.appendTo("#J_categoryList");

                    var childArr = sideArr[i].child;
                    var col = Math.ceil(childArr.length / 6);
                    node.find("div.children").addClass("children-col-"+col);

                    for(var j=0; j<childArr.length; j++){
                        if(j%6 == 0){
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j/6)}"></ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                                <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                    <img src="./images/${childArr[j].img}?thumb=1&amp;w=40&amp;h=40&amp;f=webp&amp;q=90" width="40" height="40" alt="" class="thumb">
                                    <span class="text">${childArr[j].title}</span>
                                </a>
                            </li>`).appendTo(newUl);
                    }

                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function leftTab(){
        $("#J_categoryList").on("mouseenter",".category-item",function(){
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave",".category-item",function(){
            $(this).removeClass("category-item-active");
        })
    }

    function topDownload(){
        $.ajax({
            type: "get",
            url: "../data/nav.json",
            success: function(result){
                var topNavArr = result.topNav;
                for(var i=0; i<topNavArr.length; i++){
                    var node = $(`<li data-index="${i}" class="nav-item">
                                    <a href="javascript: void(0);" class="link">
                                        <span class="text">${topNavArr[i].title}</span>
                                    </a>
                                </li>`);
                    $(node).appendTo(".nav-list");

                    var node2 = $(`<ul class="children-list clearfix" style="display:none"></ul>`);
                    $(node2).appendTo("#J_navMenu .container");
                    var topNavChilds = topNavArr[i].childs;
                    for(var j=0; j<topNavChilds.length; j++){
                        $(`<li>
                                <a href="#">
                                    <div class="figure figure-thumb">
                                        <img src="${topNavChilds[j].img}" alt="">
                                    </div>
                                    <div class="title">${topNavChilds[j].a}</div>
                                    <p class="price">${topNavChilds[j].i}</p>
                                </a>
                            </li>`).appendTo(node2);
                    }
                }
                
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    function topNavTab(){
        $(".nav-list").on("mouseenter",".nav-item",function(){
            $(this).addClass("nav-item-active");
            $("#J_navMenu .container ul").css("display","none").eq($(this).index()-1).css("display","block");
            $("#J_navMenu").removeClass("slide-up").addClass("slide-down");
        });

        $(".nav-list").on("mouseleave",".nav-item",function(){
            $(this).removeClass("nav-item-active");
            $("#J_navMenu").addClass("slide-up").removeClass("slide-down"); 
        });
        
        $("#J_navMenu").mouseenter(function(){
            $("#J_navMenu").addClass("slide-down").removeClass("slide-up"); 
        }).mouseleave(function(){
            $("#J_navMenu").addClass("slide-up").removeClass("slide-down"); 
        })
    }


    function searchTab(){
        $("#search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show");
        }).blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        })
    }

    return {
        download: download,
        banner: banner,
        leftDownload: leftDownload,
        leftTab: leftTab,
        topDownload: topDownload,
        topNavTab: topNavTab,
        searchTab: searchTab
    }
})