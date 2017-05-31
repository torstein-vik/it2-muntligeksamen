var loadedVideos = {};

function load(id){
    var loaded = new $.Deferred();

    if(loadedVideos[id]){
        loaded.resolveWith(loadedVideos[id]);
    } else {

        $.ajax({
            url: "api.php",
            method: "POST",
            data: {
                url: "https://youtube.com/watch?v=" + id
            }
        }).done((res) => {
            var dom = $(res);

            loadedVideos[id] = {
                dat: res,
                title: dom.find("title").html()
            };

            loaded.resolveWith(loadedVideos[id]);
        });
    }

    return loaded;
}
