$(function(){

  function buildHTML(message){
    if (message.image) {
      let html = `<div class="Main__message__list" data-message-id=${message.id}>
                    <div class="Main__message__list__info">
                      <div class="Main__message__list__info__name">
                        ${message.user_name}
                      </div>
                      <div class="Main__message__list__info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="Main__message__list__content">
                      <div class="Main__message__list__content__contents">
                        ${message.content}
                      </div>
                      <img class="Main__message__list__content__image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="Main__message__list" data-message-id=${message.id}>
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
      $('.submit-btn').prop('disabled', false);
    });
  });

  // let reloadMessages = function( ){
  //   let last_message_id = $(".Main__message__list").data("message-id") || 0;
  //   $.ajax({
  //     url: "api/messages",
  //     type: 'get',
  //     dataType: 'json',
  //     data: {id: last_message_id}
  //   })
  //   .done(function(messages) {
  //     if (messages.length !== 0) {
  //       let insertHTML = '';
  //       $.each(messages, function(i, message){
  //         insertHTML += buildHTML(message)
  //       });
  //       $('.Main__message').append(insertHTML);
  //       $('.Main__message').animate({ scrollTop: $('.Main__message')[0].scrollHeight});
  //     }
  //   })
  //   .fail(function() {
  //     alert('error');
  //   });
  // };
  // setInterval(reloadMessages, 7000);
});