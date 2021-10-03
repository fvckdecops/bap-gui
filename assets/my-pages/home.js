$(function() {
    getListUsers();
    getPortfolio();
    // getNews();
    
    $('#contact-form').validator();

    grecaptcha.ready(function() {
        grecaptcha.execute('6Lew-KYcAAAAANAZbb_-8y18NhSLSHdu_sXpwWfN', {action:'validate_captcha'})
                    .then(function(token) {
            document.getElementById('g-recaptcha-response').value = token;
        });
    });

    $('#contact-form').on('submit', function(e) {
        e.preventDefault();

        var email = $('#form_email').val();
        var name = $('#form_name').val();
        var subject = $('#form_subject').val();
        var message = $('#form_message').val();

        if(validateEmail(email)) {
            sendEmail(encodeURIComponent(name), email, encodeURIComponent(subject), encodeURIComponent(message));
        }
    });
});

function getListUsers() {
    var params = {"id": "603d3816d52d1f09790da327"};
    var destRoute = "detailUser";

    ajax('/http?path=userDetails&dest='+ destRoute, params, function(res) {
        var socmed = '';

        $.each(res.data.socMed, function(i, v) {
            if(v.type == "facebook") {
                socmed += '<a href="http://fb.me/'+ v.value +'"><span><i class="fab fa-'+ v.type +'"></i></span></a>';
            } else if(v.type == "instagram") {
                socmed += '<a href="http://instagram.com/'+ v.value +'"><span><i class="fab fa-'+ v.type +'"></i></span></a>';
            }
        });

        $('#profilePicture').html('<img src="/assets/img/'+ res.data.pict +'" alt="Bagas Adji Pratama" class="img-circle">');
        $('#shortMsg').html('I\'m <strong>Bagas Adji Pratama</strong> and ' + res.data.shortMsg);
        $('#socMed').html(socmed);

        var totalSkill = res.data.skillSet.length;
        var listSkill = ''
        var skillContent = '';

        getSkillSet(0, 0, 4);

        function getSkillSet(ind, offset, limit) {
            var data = res.data.skillSet.slice(offset, limit);

            $.each(data, function(i, v) {
                listSkill +=    '<div class="skills-item mb-30">'+
                                '    <h6>'+ v.skill +'</h6>'+
                                '    <div class="bar">'+
                                '      <span class="fill" data-width="'+ v.level +'%"></span>'+
                                '    </div>'+
                                '    <div class="tip"></div>'+
                                '</div>';
            });

            skillContent +=      '<div class="col-md-6">'+
                                        listSkill+
                                 '</div>';
            listSkill = '';

            if(ind < totalSkill) getSkillSet(ind+1, offset+4, limit+4);
            if(ind === totalSkill) $('#skillSet').html(skillContent);
        }

        $('#phoneNumber').html(res.data.phoneNumber);
    });
}

function getPortfolio() {
    var params = {"limit": 50};
    var destRoute = "getPortfolios";

    ajax('/http?path=portfolio&dest='+ destRoute, params, function(res) {
        var arrFilter = [];
        var filterList = '<button type="button" data-filter="*" class="active capitalizeText">All</button>';
        var content = '';
        $.each(res.data, function(i, v) {
            if(arrFilter.indexOf(v.type) === -1) {
                arrFilter.push(v.type);
            }
            content +=  '<div class="col-lg-3 col-md-3 '+ v.type +' web mb-30">'+
                        '    <div class="item-img">'+
                        '      <a class="single-image" href="'+ v.link +'" target="_blank"></a>'+
                        '      <div class="part-img">'+
                        '        <img src="/assets/img/portfolio/'+ v.image +'" alt="'+ v.title +'">'+
                        '        <div class="overlay-img">'+
                        '          <h4 class="capitalizeText">'+ v.type +'</h4>'+
                        '          <h6>'+ v.title +'</h6>'+
                        '        </div>'+
                        '      </div>'+
                        '    </div>'+
                        '</div>';
        });

        $.each(arrFilter, function(i, v) {
            filterList += '<button type="button" data-filter=".'+ v +'" class="capitalizeText">'+ v +'</button>';
        });

        $('#filterList').html(filterList);
        $('#portfolioList').html(content);
    });
}

function getNews() {

    var params = {"limit": 3};
    var destRoute = "getNews";

    ajax('/http?path=news&dest='+ destRoute, params, function(res) {
        var content = '';
        $.each(res.data, function(i, v) {
            content +=  '<div class="col-lg-4 sm-mb-30">'+
                        '    <div class="blog-item">'+
                        '      <div class="part-img">'+
                        '        <img src="/assets/img/blog/'+ v.pics +'" alt="'+ v.title +'">'+
                        '        <div class="post-info-category">'+
                        '          <a href="/category/'+ v.category +'" class="capitalizeText">'+ v.category +'</a>'+
                        '        </div>'+
                        '      </div>'+
                        '      <div class="content">'+
                        '        <div class="title">'+
                        '          <h4 class="mb-5"><a href="/news/'+ v.url +'">'+ v.title +'</a></h4>'+
                        '          <div class="meta">'+
                        '          <ul>'+
                        '            <li>'+ moment.utc(v.createdAt).format('dd MMM YYYY') +'</li>'+
                        '          </ul>'+
                        '        </div>'+
                        '        </div>'+
                        '        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque.</p>'+
                        '        <div class="author">'+
                        '          <div class="part-img">'+
                        '            <img src="/assets/img/avatar.jpg" alt="'+ v.title +'">'+
                        '          </div>'+
                        '          <div class="text">'+
                        '            <h5>By <b>Bagas Adji Pratama</b></h5>'+
                        '          </div>'+
                        '        </div>'+
                        '      </div>'+
                        '    </div>'+
                        '</div>';
        });

        $('#blog .section-title').after(content);
    });
}

function sendEmail(name, email, subject, message) {
    name = decodeURIComponent(name);
    subject = decodeURIComponent(subject);
    message = decodeURIComponent(message);
    var token = $('#g-recaptcha-response').val();

    var params = {
        "fromMail": email,
        "name": name,
        "subject": subject,
        "g-recaptcha-response": token,
        "message": message
    }

    ajax('/sendMail', params, function(res) {
        if(res.status == 0) {
            toastr.options = {
                "positionClass": "toast-bottom-right",
            }
            toastr.success(res.message, 'Success');
        } else {
            toastr.options = {
                "positionClass": "toast-bottom-right",
            }
            toastr.warning(res.message, 'Warning');
        }
    });
}