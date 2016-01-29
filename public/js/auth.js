/**
 * Created by fellix on 28.01.16.
 */

$(function () {
    var ua = navigator.userAgent;
    var rx = new RegExp('MSIE [0-9]');
    if (!rx.test(ua)) {
        $('label').hide();
    }

    $('#user-field').autocomplete({
        delay: 1500,
        minLength: 3,
        source: function (request, response) {
            $.post('/login/complete/', {q: request.term},
            function(data) {
                response(data);
            }, 'json');
        },
        select: function (ev, ui) {
            $(this).val(ui.item.label);
            $('input[type="password"]').focus();
            $('#user-id').val(ui.item.value);
            return false;
        },
        focus: function() {
            return false;
        },
        response: function (ev, ui) {
            $(this).parent().toggleClass('has-error', ui.content.length === 0);
            if (ui.content.length === 0) {
                showPopup('Пользователь не найден. Проверьте правильность ввода');
                $(this).val('');
            }

            // автозавершение ввода, если в списке "живого поиска" остался только один вариант
            if (ui.content.length === 1) {
                ui.item = ui.content[0];
                $(this).data('ui-autocomplete')._trigger('select', 'autocompleteselect', ui);
                $(this).autocomplete('close');
            }
        }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>")
            .append("<a>" + item.label + "</a>")
            .append( $('<em/>').addClass('pull-right text-muted').html(item.value) )
            .appendTo( ul );
    };

    $('#btn-login').click(function (e) {
        e.preventDefault();

        $.ajax({
            url: 'http://bid-journal.asu.ngres/auth/login/',
            type: 'post',
            //crossDomain: true,
            data: {login: 'ктц', password:'123'},
            //xhrFields: {withCredentials: true},
            success: function(data) {
                console.log(data);
            }
        });
    });
});