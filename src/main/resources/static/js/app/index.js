var index = {
    init: function() {
        var _this = this;
        var _modal = $('.modal');
        $('#btn-create').on('click', function() {
            $('.modal-content').css('display', 'none');
            $('.div-form-create').css('display', 'block');
            _modal.css('display', 'block');
        })
        $('#btn-save-create').on('click', function() {
            _this.save();
            _modal.css('display', 'none');
        })
        $('.btn-delete').on('click', function() {
            var id = $(this).parent().siblings('.todo-item-id').html();
            _this.delete(id);
        })
        $('.btn-update').on('click', function() {
            var id = $(this).parent().siblings('.todo-item-id').html();
            $('.modal-content').css('display', 'none');
            $('.div-form-update').css('display', 'block');
            $('.update-id').text(id);
            _modal.css('display', 'block');
        })
        $('#btn-save-update').on('click', function() {
            var id = $('.update-id').html();
            _this.update(id);
        })
        $('.btn-cancel').on('click', function() {
            _modal.css('display', 'none');
        })
        $('.todo-item').on('click', function() {
            var id = $(this).children('.todo-item-id').html();
            $('.modal-content').css('display', 'none');
            $('.div-content').css('display', 'block');
            _modal.css('display', 'block');
            _this.search(id);
        })
    },
    search: function(id) {
        $.ajax({
            type: 'GET',
            url: '/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        }).done(function(json) {
            var _title = json.title;
            var _author = json.author;
            var _content = json.content;
            var _createdDate = json.createdDate;

            $('.post-title').text(_title);
            $('.post-author').text(_author);
            $('.post-createdDate').text(_createdDate);
            $('.post-content').text(_content);
        }).fail(function(error) {
            alert(JSON.stringify(error));
        })
    },
    save: function() {
        var data = {
            title: $('.create-title').val(),
            author: $('.create-author').val(),
            content: $('.create-content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/posts',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 등록되었습니다.');
            window.location.reload();
        }).fail(function(error) {
            alert(JSON.stringify(error));
        })
    },

    delete: function(id) {
        $.ajax({
            type: 'DELETE',
            url: '/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        }).done(function() {
            alert('글이 삭제되었습니다.');
            window.location.reload();
        }).fail(function(error) {
            alert(JSON.stringify(error));
        })
    },

    update: function(id) {
        var data = {
            title: $('.update-title').val(),
            content: $('.update-content').val()
        };

        $.ajax({
            type: 'PUT',
            url: '/posts/' + id,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 수정되었습니다.');
            window.location.reload();
        }).fail(function(error) {
            alert(JSON.stringify(error));
        })
    }
}

index.init();