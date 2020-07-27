$(function(){

  function buildHTML(message){
    if (message.image) {
      let html = `<div class="Main__message__list">
                    <div class="Main__message__list__info">
                      <div class="Main__message__list__info__name">
                        ${message.user_name}
                      </div>
                      <div class="Main__message__list__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Main__message__list__content">
                      ${message.content}
                      ${message.image}
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="Main__message__list">
                    <div class="Main__message__list__info">
                      <div class="Main__message__list__info__name">
                        ${message.user_name}
                      </div>
                      <div class="Main__message__list__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Main__message__list__content">
                      ${message.content}
                    </div>
                  </div>`
      return html;
    }
  }
  

  $('.form_contents').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function (data){
      let html = buildHTML(data);
      $('.Main__message').append(html);
      $('.Main__message').animate({ scrollTop: $('.Main__message')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
      $('.form_contents')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});