'use strict';
angular.module('poslugaApp').controller('MainCtrl', function(MetatagService, angularLoad, $stateParams, $window, $scope, $timeout, $state, $http, $rootScope, Auth, gettextCatalog) {
    $scope.searchtext = "";
    var bookmark;
    $scope.currentUser = Auth.getCurrentUser();
    $scope.serviceDirect = (Auth.isLoggedIn() ? 'profile({type: \'new\'})' : 'giveservice');
    $scope.serviceswithicons = [];
    $scope.subcategories = [];
    $scope.comments = [];
    $scope.subjects = [];
    $scope.metaimage = 'https://s3-eu-west-1.amazonaws.com/poslugaua/pictures/poslugactafacebook.png';
    $scope.oneAtATime = true;
    $scope.comments = [{
        firstname: "Георгий",
        place: "Киев",
        service: "Бухгалтерские услуги",
        price: "1200",
        leftAt: moment("11.04.2016"),
        message: "Хорошая компания, буду работать с ними постоянно. Во-первых значительно дешевле,чем нанимать бухгалтера на постоянную работу, во вторых компания очень совестно выполнила свою работу,не нужен контроль."
    }, {
        firstname: "Віталіна",
        place: "Київ",
        service: "Услуги сантехника",
        price: "300",
        leftAt: moment("11.01.2016"),
        message: "Ви мене просто врятували від потопу! Спасибі,що швидко приїхали! Дуже задоволена роботою і швидкістю."
    }, {
        firstname: "Анатолий",
        place: "Днепр",
        service: "Ремонт квартир",
        price: "12500",
        leftAt: moment("10.23.2016"),
        message: "Очень хорошо сделали, хоть и по срокам чуть-чуть подвели, но зато качественно."
    }, {
        firstname: "Василий",
        place: "Черкассы",
        service: "Услуги плотника",
        price: "1100",
        leftAt: moment("10.08.2016"),
        message: "Закал стол из дуба - красота неописуемая! Буду еще заказывать."
    }, {
        firstname: "Анастасия",
        place: "Днепр",
        service: "Услуги визажиста",
        price: "600",
        leftAt: moment("08.28.2016"),
        message: "Свадебный макияж просто супер! Чувствовала себя самой красивой. Визажист приятная девушка, на годовщину свадьбы тоже пойду к ней."
    }, {
        firstname: "Алина",
        place: "Киев",
        service: "Дерматолог",
        price: "250",
        leftAt: moment("08.24.2016"),
        message: "Сделали механическую чистку, мне понравилось. Недавно переехала в город, даже не знала где искать косметолога."
    }, {
        firstname: "Елена",
        place: "Харьков",
        service: "Стрижка кошек",
        price: "220",
        leftAt: moment("07.19.2016"),
        message: "Очень прикольно постригли! Теперь у меня не кот, а целый лев! И кот не царапался почти, видать хороший человек стриг))"
    }]

    function getArticles() {
        $scope.deferred = $scope.changeArticleListing();
    }
    $scope.changeArticleListing = function() {
        var order = '';
        var sort = '';
        if ($scope.query.order.indexOf('-') > -1) {
            sort = 'asc';
            order = $scope.query.order.replace('-', '');
        } else {
            sort = 'desc';
            order = $scope.query.order;
        }
        $http.get('/api/articles?filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
        success(function(data) {
            $scope.articles = data.results;
        });
    };
    $scope.chunk = function(arr, len) {
        var chunks = [],
            i = 0,
            n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }
        return chunks;
    }
    $scope.gotoRequest = function(serviceid, searchtext) {
        $state.go('request', {
            serviceid: serviceid,
            type: 'new',
            searchtext: searchtext
        });
    }
    if ($state.current.name === 'testimonials') {
        // $http.get('/api/quotes/allcomments/20').success(function(comments) {
        //     $scope.comments = comments;
        // });
        var title = gettextCatalog.getString('Testimonials') + ' | Posluga.ua';
        var description = gettextCatalog.getString('Here’s what some of the happy consumers who have taken services through Posluga.ua are saying.');
        MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
    } else if ($state.current.name === 'main') {
        $http.get('/api/services/subcategories/icons').success(function(serviceswithicons) {
            $scope.serviceswithicons = serviceswithicons;
            // $http.get('/api/quotes/allcomments/4').success(function(comments) {
            //     $scope.comments = comments;
            // });
            $scope.comments = [{
                picture: 'https://scontent-fra3-1.xx.fbcdn.net/v/l/t1.0-1/p160x160/14671247_1442175665810689_8153669508096626502_n.jpg?oh=6d6aa44856e3df428c403a994d9a157c&oe=58EADD6D',
                firstname: "Екатерина",
                place: "Харьков",
                service: "Маникюр",
                price: "95",
                leftAt: moment("11.03.2016"),
                message: "Огромное спасибо! Очень хороший специалист, большой выбор гель лаков, все вделала качественно и со вкусом. А цена вообще порадовала)"
            }, {
                picture: 'https://pp.vk.me/c5432/v5432410/1a05/OQgjMfcoUb0.jpg',
                firstname: "Ярослав",
                place: "Киев",
                service: "Услуги сантехника",
                price: "400",
                leftAt: moment("11.01.2016"),
                message: "Ви мене просто врятували від потопу! Спасибі, що швидко приїхали! Дуже задоволена роботою і швидкістю."
            }, {
                picture: 'https://scontent-waw1-1.xx.fbcdn.net/v/t1.0-9/13775928_1659743561013716_2807469736071214391_n.jpg?oh=93a7e4aafc9663357d62eb26930ee802&oe=596EA02E',
                firstname: "Валентина",
                place: "Днепр",
                service: "Кухня под заказ",
                price: "6700",
                leftAt: moment("10.14.2016"),
                message: "Остался довольный кухней. Сделали не дорого, но с хорошей фурнитурой и материалами. Отдельное спасибо за сервис, мужу нравится дизайн и фунциональность."
            }, {
                picture: 'https://pp.vk.me/c630516/v630516212/457f6/hBBr66O9FKs.jpg',
                firstname: "Наталья",
                place: "Одесса",
                service: "Уборка квартир",
                price: "190",
                leftAt: moment("08.15.2016"),
                message: "Хорошо убрала, женщина воспитанная и приятная. Готова рекомендовать всем друзьям."
            }]
            var title = gettextCatalog.getString('Get Free Price Quotes For Services.') + " | Posluga.ua";
            var description = "Сайт Послуга.юа. Опишите необходимую услугу, Получите 5 цен, Сравните и выберите лучшую. Лучшие цены! компании конкурируют между собой"; //gettextCatalog.getString('Gone are the days of ringing people for quotes!') + ' ' + gettextCatalog.getString('1 - Tell Us What You Need') + ', ' + gettextCatalog.getString('2 - Get Price Quotes') + ', ' + gettextCatalog.getString('3 - Hire The Right Business') + '. ' + gettextCatalog.getString('Best prices you can find because companies compete to give you the best price.');
            MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
        });
    } else if ($state.current.name === 'faq') {
        var title = gettextCatalog.getString('Frequently Asked Questions') + ' | Posluga.ua';
        var description = gettextCatalog.getString('We’ve tried our very best to make Posluga.ua easy to use. But sometimes things aren’t quite as clear as they need to be. If you don’t find the answer you need here, you can also contact us.');
        MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
    } else if ($state.current.name === 'blog') {
        $scope.filter = {
            options: {
                debounce: 500
            }
        };
        $scope.query = {
            filter: '',
            limit: '50',
            order: 'createdAt',
            page: 0
        };
        $scope.changeArticleListing();
        $scope.$watch('query.filter', function(newValue, oldValue) {
            if (!oldValue) {
                bookmark = $scope.query.page;
            }
            if (newValue !== oldValue) {
                $scope.query.page = 0;
            }
            if (!newValue) {
                $scope.query.page = bookmark;
            }
            getArticles();
        });
        var title = gettextCatalog.getString('Blog') + ' | Posluga.ua';
        var description = gettextCatalog.getString('Welcome to our blog where we share articles and advice about services');
        MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
        angularLoad.loadScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-585f468486e95396&async=1');
    } else if ($state.current.name === 'article') {
        $http.get('/api/articles/slug/' + $stateParams.slug).success(function(article) {
            $scope.article = article;
            var title = article.title + ' | Posluga.ua';
            MetatagService.setMetaTags(article.user.name, title, article.description, article.image, false);
            angularLoad.loadScript('https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-585f468486e95396&async=0');
            $scope.query = {
                filter: '',
                limit: '7',
                order: 'createdAt',
                page: 0
            };
            var order = '';
            var sort = '';
            if ($scope.query.order.indexOf('-') > -1) {
                sort = 'asc';
                order = $scope.query.order.replace('-', '');
            } else {
                sort = 'desc';
                order = $scope.query.order;
            }
            $scope.articles = [];
            $http.get('/api/articles?filter=' + $scope.query.filter + '+&order=' + order + '&sort=' + sort + '+&per_page=' + $scope.query.limit + '&page=' + $scope.query.page).
            success(function(data) {
                data.results.forEach(function(x) {
                    if (x.title !== $scope.article.title) {
                        $scope.articles.push(x)
                    }
                })
            });
        })
    } else if ($state.current.name === 'howitworks') {
        var title = gettextCatalog.getString('How it Works?') + ' | Posluga.ua';
        var description = gettextCatalog.getString("Just tell us what service you need, and qualified local service providers will send you their price quotes. Then, compare and hire the provider that's right for you.");
        MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
    } else if ($state.current.name === 'terms') {
        var title = gettextCatalog.getString('Terms of Use') + ' | Posluga.ua';
        var description = gettextCatalog.getString('Here’s what you agree to by using this website.');
        MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
    } else if ($state.current.name === 'privacy') {
        var title = gettextCatalog.getString('Privacy Policy') + ' | Posluga.ua';
        var description = gettextCatalog.getString('Posluga.ua has created this privacy statement in order to demonstrate our firm commitment to your privacy. The following discloses the information gathering and dissemination practices for this website.');
        MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
    } else if ($state.current.name === 'aboutus') {
        var title = gettextCatalog.getString('About Us') + ' | Posluga.ua';
        var description = gettextCatalog.getString("Posluga.ua is about capturing consumer's service request, sending this request to related local service providers, and competing them to send price quotes to the consumer to select the best one.");
        MetatagService.setMetaTags("Posluga.ua", title, description, $scope.metaimage, false);
    }
});