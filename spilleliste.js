$(() => {
    playlists.forEach((playlist) => {
        var playlist_container = $("<div>");

        playlist_container.append("<h3>"+playlist.name+"</h3>");

        var video_container = $("<div class='videos'>");

        var loaded = Array.apply(null, Array(playlist.videos.length)).map(() => new $.Deferred());


        playlist.videos.forEach((videoid, index) => {

            load(videoid).done((result) => {

                loaded[index].resolve(result);
            });


        });

        $.when.apply($, loaded).done(function(){

            Array.prototype.slice.call(arguments).forEach((argument) => {

                var video = $("<div>");

                video.append("<img src='"+argument.thumbnail+"'>");
                video.append(argument.title);

                video_container.append(video);

            });

            playlist_container.append(video_container);

            $("#playlists").append(playlist_container);

        });

    });
});
