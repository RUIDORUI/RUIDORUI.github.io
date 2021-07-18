function pageOut() {
    $(window).bind('unload', function() {
        $("body").hide();
        $("body").fadeOut(1000);
    });

}



function pwsVisible(i, t) {
    const togglePassword = document.querySelector(t);
    const inputPassword = document.querySelector(i);
    // const togglePassword = t
    // const inputPassword = i;


    togglePassword.addEventListener('click', function() {
        const type = inputPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        inputPassword.setAttribute('type', type);
        this.classList.toggle('bi-eye-slash-fill');
    });
}

function checkSignIn(item) {
    $.ajax({
        type: 'POST',
        url: 'http://hitsujishop_test.com:6080/php/checkSignIn.php',
        success: function(data) {

            if (data == 'member') {
                $('.logo').after(` 
                <div class='nav_Menu'>
                    <a href='http://hitsujishop_test.com:6080/hitsuji%20copy.html' class='navMenu_Link' id='goods_Link'>Goods</a>
                    <a href='http://hitsujishop_test.com:6080/account.html' class='navMenu_Link' id='account_Link'>Account</a>
                    <a href='http://hitsujishop_test.com:6080/order.html' class='navMenu_Link' id='order_Link'>Order</a>
                    <a href='http://hitsujishop_test.com:6080/faq.html' class='navMenu_Link' id='faq_Link'>FAQ</a>
                    <a href='###' class='navMenu_Link' id='logout_Link' onclick='logOut()'>Log out</a>
                </div>`);
                selected_Color(item);
            } else if (data == 'administrator') {
                $('.logo').after(` 
                <div class='nav_Menu'>
                    <a href='http://hitsujishop_test.com:6080/hitsuji%20copy.html' class='navMenu_Link' id='goods_Link'>Goods</a>
                    <a href='http://hitsujishop_test.com:6080/account.html' class='navMenu_Link' id='account_Link'>Account</a>
                    <a href='http://hitsujishop_test.com:6080/order_List.html' class='navMenu_Link' id='order_Link'>Order</a>
                    <a href='http://hitsujishop_test.com:6080/faq.html' class='navMenu_Link' id='faq_Link'>FAQ</a>
                    <a href='###' class='navMenu_Link' id='logout_Link' onclick='logOut()'>Log out</a>
                </div>`);
                selected_Color(item);
            } else {
                $('.logo').after(` 
                <div class='nav_Menu'>
                    <a href='http://hitsujishop_test.com:6080/hitsuji%20copy.html' class='navMenu_Link' id='goods_Link'>Goods</a>
                    <a href='###'' class='navMenu_Link' id='signup_Link' onclick='showSignIn()'>SignIn/Up</a>
                    <a href='http://hitsujishop_test.com:6080/faq.html' class='navMenu_Link' id='faq_Link'>FAQ</a>
                </div>`);
                selected_Color(item);
            }
            console.log(data);
        },
        error: function(xhr) {
            alert(xhr.status);
        }

    })


}

function signIn() {
    $('.input_Error').fadeOut('slow');
    $.ajax({
        type: 'post',
        url: 'http://hitsujishop_test.com:6080/php/sign.php?do=signIn',
        dataType: 'html',
        data: $('#signIn_Form').serialize(),
        success: function(data) {
            let response = JSON.parse(data);
            let accountName = response.accountName;
            let result = response.result;
            let session = response.session;

            switch (result) {
                case 'true':
                    $('#signIn_Form').fadeOut('slow', function() {
                        $(this).remove();

                    });
                    $('#signInForm_Wrapper').html(
                        `<div id='signIn_Success'>
                            <h1>
                                Welecome Back<br>
                                ${accountName}.
                            </h1>
                        </div>`);
                    $('#signIn_Success').fadeIn(3000, function() {
                        $('#signInForm_Wrapper').fadeOut(1000, function() {
                            window.location.href = 'http://hitsujishop_test.com:6080/hitsuji%20copy.html';
                        });
                        console.log('123');
                    });
                    // document.location.href = 'http://google.com';
                    break;
                case 'name_False':
                    $('.input_Error').fadeOut('slow');
                    $('#signInPassword_Error').fadeOut('slow');
                    $('#signInPassword_Error').fadeIn('slow');
                    console.log(result);
                    break;
                case 'false':
                    $('.input_Error').fadeOut('slow');
                    $('#signInName_Error').fadeOut('slow');
                    $('#signInName_Error').fadeIn('slow');
                    console.log(result);

                    break;

                default:
                    console.log('555');
                    break;
            }
            console.log(accountName);
            console.log(response);
        },
        error: function(xhr) {
            alert(xhr.status);
        }
    })
}






function showSignIn() {
    $('.footer').after('<div id="signIn_Section"></div>');


    $('#signIn_Section').html(`
        <div id="signInForm_Wrapper">
            <form action="javascript:signIn()" id="signIn_Form">
                <h1>Sign In</h1>
                <h4>Please Fill Informations Below</h4>

                <div class="signInInput_Wrapper">
                    <div class='input_Error' id="signInName_Error">This Account Name is not exist</div>
                    <div class="signInInput_Field">
                        <h4>Account Name：</h4>
                        <input type="text" name="signIn_Account" id="signIn_Account" placeholder="Enter Your Name">
                        
                    </div>
                    <div class="signInInput_Field">
                        <h4>Password：</h4>
                        <input type="password" name="signIn_Password" id="signIn_Password" placeholder="Enter Your Password">
                        <i class="bi bi-eye-fill" id="toggle_Signin"></i>
                        <div class='input_Error' id="signInPassword_Error">Wrong Password</div>
                    </div>
                    <button class="signIn_Button" id="signin_Submit" type="submit">Confirm</button>
                    <a href="" class="signIn_Button" id="signIn_Forget">Forget Password?</a>
                </div>
                <div class="signIn_Create">
                    <h4>Don't Have a Account? <a href="http://hitsujishop_test.com:6080/signup.html" id="signIn_CreateLink">Create One.</a></h4>
                </div>

            </form>
        </div>`);
    console.log('signin');

    pwsVisible('#signIn_Password', '#toggle_Signin');
    $('#signInForm_Wrapper').fadeIn('slow');

    $('#signIn_Section').on('click', function(e) {
        if (e.target == this) {
            $(this).fadeOut(500, function() {
                $(this).remove();
            });


        }
    });
}

function logOut() {
    $.ajax({
        type: 'GET',
        url: 'http://hitsujishop_test.com:6080/php/sign.php?do=logOut',
        success: function(data) {
            console.log(data);
            window.location.href = 'http://hitsujishop_test.com:6080/hitsuji%20copy.html';
        },
        error: function(xhr) {
            alert(xhr);
        }
    })
}

function selected_Color(item) {
    $(`${item}`).addClass('selected');
    console.log('selected');
}

function showSuccessWindow(text, href) {
    $('.footer').after('<div id="signIn_Section"><div id="signInForm_Wrapper"></div></div>');
    $('#signInForm_Wrapper').html(
        `<div id='signIn_Success'>
        <h1>
          ${text}
        </h1>
    </div>`);
    $('#signIn_Success').fadeIn(3000, function() {
        $('#signInForm_Wrapper').fadeIn();
        $('#signInForm_Wrapper').fadeOut(1500, function() {
            window.location.href = `${href}`;
        });
        console.log('123');
    });

}

function cartScroll() {
    $(window).scroll(function() {
        let st = $(window).scrollTop(),
            wh = document.documentElement.scrollHeight;
        let cart = $('.cartWrapper');


        if (st > 0) {
            cart.addClass('cart_Animate');

            window.setTimeout(() => {
                cart.removeClass('cart_Animate');

            }, 1500)

        } else {

        }
    })


}

function show_Min_Cart() {
    $('body').on('click', '.show_Cart', function() {
        $('.footer').after('<div id="signIn_Section"><div id="signInForm_Wrapper"></div></div>');

        $.ajax({
            type: 'POST',
            url: `http://hitsujishop_test.com:6080/php/order.php?do=show_Cart`,
            success: function(data) {

                $('#signInForm_Wrapper').append(data);
                let b = document.querySelector(".checkout_Button");

                b.setAttribute("onclick", "check_Cart_Signin()");



            },
            error: function(xhr) {
                alert(xhr);
            }
        });


        $('#signInForm_Wrapper').css({ 'width': '80%' });
        $('#signInForm_Wrapper').fadeIn();

        $('#signIn_Section').on('click', function(e) {
            if (e.target == this) {
                $(this).fadeOut(500, function() {
                    $(this).remove();
                });


            }

        });
        $('body').on('click', '.delete_Cart', function() {
            let cart_Id = $(this).data('cartid');
            let qty = $(this).data('qty');
            let delete_Item = $(this);
            console.log($(this));
            console.log(cart_Id);
            $.ajax({
                type: 'POST',
                url: `http://hitsujishop_test.com:6080/php/order.php?do=delete_Cart&cartid=${cart_Id}&qty=${qty}`,
                success: function(data) {
                    // let response = JSON.parse(data);
                    let new_Total = data;
                    delete_Item.parent().parent().remove();
                    console.log($(this));
                    $('.total_Title').text(`Total：$${new_Total}`);
                    // console.log(response);
                    cart_Total(0);
                },
                error: function(xhr) {
                    alert(xhr);
                }
            })
        });



    });





}

function check_Cart_Signin() {
    $.ajax({
        type: 'POST',
        url: 'http://hitsujishop_test.com:6080/php/checkSignIn.php',
        success: function(data) {
            if (data == 'member' || data == 'administrator') {
                location.href = 'http://hitsujishop_test.com:6080/cart.html';
            } else {
                $('#signIn_Section').remove();
                showSignIn();
            }
        },
        error: function(xhr) {
            alert(xhr);
        }

    });
}

function cart_Total(a) {
    $.ajax({
        type: 'POST',
        url: `http://hitsujishop_test.com:6080/php/order.php?do=count_Total`,
        success: function(data) {
            let t = data + a;
            console.log('total：' + data);

            $('#cart_Number').fadeOut();
            document.querySelector('#cart_Number').innerHTML = data;
            $('#cart_Number').fadeIn("slow");
        },
        error: function(xhr) {
            alert(xhr);
        }
    })
}