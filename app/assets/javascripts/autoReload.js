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
                      ${message.content}
                      ${message.image}
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
  
  let reloadMessages = function( ){
    let last_message_id = $('.Main__message__list:last').data("message-id") ||0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.Main__message').append(insertHTML);
        $('.Main__message').animate({ scrollTop: $('.Main__message')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});