$(function(){
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox')
    const $rightBox = $('#rightBox')
    // 登录注册框切换
    $loginBox.find("a").on('click',function(){
        $registerBox.show();
        $loginBox.hide();
    })

    $registerBox.find("a").on('click',function(){
        $loginBox.show();
        $registerBox.hide();
    })

    const $regName = $registerBox.find('[name="name"]')
    const $regpass = $registerBox.find('[name="password"]')
    const $regpass2 = $registerBox.find('[name="repassword"]')
    $registerBox.find("button").on('click',function(){
       $.ajax({
           url:'/api/user/register',
           type:'POST',
           data:{
               username: $regName.val(),
               password: $regpass.val(),
               repassword: $regpass2.val()
           },
           success: function(result){
                $registerBox.find('.colWarning').html(result.message)
                if(result.code == 0){
                    setTimeout(()=>{
                        $loginBox.show();
                        $registerBox.hide();
                    },1000)
                }
            },
            error: function(err){
                console.log(err)
            }
       })
    })

    const $loginName = $loginBox.find('[name="name"]')
    const $loginpass = $loginBox.find('[name="password"]')
    $loginBox.find("button").on('click',function(){
        $.ajax({
            url:'/api/user/login',
            type:'POST',
            data:{
                username: $loginName.val(),
                password: $loginpass.val(),
            },
            success: function(result){
                 $loginBox.find('.colWarning').html(result.message)
                 if(result.code == 0){
                     window.location.reload();
                 }
             },
             error: function(err){
                 console.log(err)
             }
        })
     })

    // 退出
    $('#logoutBtn').on('click',function(){
        $.ajax({
            url:'/api/user/logout',
            type:'POST',
            success:function(ret){
                if(ret.code == 0){
                    window.location.reload();
                }
            }
        })
    })
})