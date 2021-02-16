var a, b, c,
    submit_icerik,
    captcha,
    kilitli,
    submitOnay = false,
    timeoutHandle;

  // a+b=c toplamını üreten fonksiyon
function olusturCaptcha(){
  a = Math.ceil(Math.random() * 10);
  b = Math.ceil(Math.random() * 10);
  c = a + b;
  submit_icerik = '<span>' + a + '</span> + <span>' + b + '</span>' +
    ' = <input class="submit__input" type="text" maxlength="2" size="2" required />';
  $('.submit_uretılme').html(submit_icerik);

  init();
}

// Sonuç olan C'miz girilen cevaba eşit mi?
function checkCaptcha(){
  if(captcha === c){
    // yeşil tik işareti çıkarır
    $('.submit_uretılme')
      .removeClass('unvalid')
      .addClass('valid');
    
    $('.submit__error').addClass('hide');
    $('.submit__error--empty').addClass('hide');
    submitOnay = true;
  }
  else {
    if(captcha === ''){
      $('.submit__error').addClass('hide');
      $('.submit__error--empty').removeClass('hide');
    }
    else {
      $('.submit__error').removeClass('hide');
      $('.submit__error--empty').addClass('hide');
    }
    //Kırmızı geçersiz işareti çıkarır.
    $('.submit_uretılme')
      .removeClass('valid')
      .addClass('unvalid');
    
    submitOnay = false;
  }
  return submitOnay;
}

function unlock(){ kilitli = false; }


// Yenileme düğmesi captcha'yı sıfırlar.
$('.submit__control i.fa-refresh').on('click', function(){
  if (!kilitli) {
    kilitli = true;
    setTimeout(unlock, 400);
    olusturCaptcha();
    setTimeout(checkCaptcha, 0);
  }
});

// girilen değerimiz yenilendiğinde sayıyı işleme başlatan fonksiyon
function init(){
  $('form').on('submit', function(e){
    e.preventDefault();
    if($('.submit_uretılme').hasClass('valid')){
      // var formValues = [];
      captcha = $('.submit__input').val();
      if(captcha !== ''){
        captcha = Number(captcha);
      }

      checkCaptcha();

      if(submitOnay === true){
        submitOnay = false;
        // Geçici doğrudan başarı simülasyonu
        submitted();
      }
    }
    else {
      return false;
    }
  });

  // Captcha girdi sonucunu işler
  $('.submit__input').on('propertychange change keyup input paste', function(){
    // Sayının tamamını girmeden algılamayı engeller.(12 ise 1 girdikten sonra bekler)
  
    window.clearTimeout(timeoutHandle);
    timeoutHandle = window.setTimeout(function(){
      captcha = $('.submit__input').val();
      if(captcha !== ''){
        captcha = Number(captcha);
      }
      checkCaptcha();
    },150);
  });


  // 'Enter' tuşuna basıldığında ': active' durum CSS'sini ekler
  $('body')
    .on('keydown', function(e) {
      if (e.which === 13) {
        if($('.submit-form').hasClass('overlay')){
          checkCaptcha();
        } else {
          $('.submit-form').addClass('enter-press');
        }
      }
    })
    .on('keyup', function(e){
      if (e.which === 13) {
        $('.submit-form').removeClass('enter-press');
      }
    });


  // yenileme düğmesine basılırsa captcha sıfırlanır
  $('.submit-control i.fa-refresh').on('click', function(){
    if (!kilitli) {
      kilitli = true;
      setTimeout(unlock, 500);
      olusturCaptcha();
      setTimeout(checkCaptcha, 0);
    }
  });

}

olusturCaptcha();