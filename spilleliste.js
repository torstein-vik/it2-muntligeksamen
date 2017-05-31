$(() => {
    playlists.forEach((playlist) => {
        var playlist_container = $("<div>");

        playlist_container.append("<h3>"+playlist.name+"</h3>");

        var video_container = $("<div class='videos'>");

        var loaded = Array.apply(null, Array(playlist.videos.length)).map(() => new $.Deferred());


        playlist.videos.forEach((videoid, index) => {
            var imgurl = "https://img.youtube.com/vi/"+videoid+"/default.jpg";

            var dataurl = "http://youtube.com/get_video_info?video_id="+videoid;

            $.ajax({
                url: dataurl
            }).done((result) => {
                console.log(result);

                loaded[index].resolve();
            });


        });

        $.when.apply($, loaded).done(() => {
            console.log("done!")
        });

        playlist_container.append(video_container);

        $("#playlists").append(playlist_container);
    });
});
