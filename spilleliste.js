$(() => {
    $("#back-button").click(backToSelection);

    playlists.forEach((playlist, playlist_index) => {
        var playlist_container = $("<div>");

        playlist_container.append("<h2>"+playlist.name+"</h2>");

        var video_container = $("<div class='videos'>");

        var loaded = Array.apply(null, Array(playlist.videos.length)).map(() => new $.Deferred());


        playlist.videos.forEach((videoid, index) => {

            load(videoid).done((result) => {

                loaded[index].resolve(result);
            });


        });

        $.when.apply($, loaded).done(function(){

            Array.prototype.slice.call(arguments).forEach((argument, video_index) => {

                var video = $("<div>");

                video.append("<img src='"+argument.thumbnail+"'>");
                video.append(argument.title);

                video.click(() => {
                    videoSelected(playlist_index, video_index);
                });

                video_container.append(video);

            });

            playlist_container.append(video_container);

            $("#playlists").append(playlist_container);

        });

    });
});

function videoSelected(playlistid, video_index){
    showPlaylist(playlists[playlistid]).done(() => {
        showVideo(playlists[playlistid].videos[video_index], video_index);
    });
    toggleView();
}

function backToSelection(){
    toggleView();
    $("#player iframe").attr('src', "");
    $("#playlist").html("");
}


function showVideo(videoid, video_index){
    $("#player iframe").attr('src', "https://youtube.com/embed/"+videoid);

    $("#playlist > div.active").removeClass("active");
    $("#playlist > div:nth-child("+(video_index+2)+")").addClass("active");
}

function showPlaylist(playlist){
    $("#playlist").html("<h3>"+playlist.name+"</h3>")

    var loaded = Array.apply(null, Array(playlist.videos.length)).map(() => new $.Deferred());


    playlist.videos.forEach((videoid, index) => {

        load(videoid).done((result) => {
            loaded[index].resolve(result);
        });

    });

    return $.when.apply($, loaded).done(function(){

        Array.prototype.slice.call(arguments).forEach((argument, video_index) => {

            var video = $("<div>");

            video.append("<img src='"+argument.thumbnail+"'>");
            video.append(argument.title);

            video.click(() => {
                showVideo(argument.id, video_index);
            });

            $("#playlist").append(video);

        });

    });
}

function toggleView(){

    var to   = $(toggleView.togglers[toggleView.state ^ 1]);
    var from = $(toggleView.togglers[toggleView.state]);

    var width = $("html").width();
    var shift = width * (toggleView.state * 2 - 1);

    from.css('pointer-events', 'none');
    to.css('pointer-events', 'all');

    var fromleft = from.position().left + shift;
    from.animate({
        left : fromleft ,
        right: fromleft - width
    }, 500);

    var toleft = to.position().left + shift;
    to.animate({
        left : toleft,
        right: toleft - width
    }, 500);

    toggleView.state ^= 1;
}

toggleView.state = 0;
toggleView.togglers = ["#playlists", "#player"];
