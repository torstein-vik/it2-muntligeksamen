var loadedVideos = {};

function load(id){

    if(!loadedVideos[id]){

        loadedVideos[id] = new $.Deferred();

        $.ajax({
            url: "api.php",
            method: "POST",
            data: {
                url: "https://youtube.com/watch?v=" + id
            }
        }).done((res) => {

            loadedVideos[id].resolve({
                dat: res,
                title: res.match(/<title>(.*) - YouTube<\/title>/)[1],
                thumbnail: "https://img.youtube.com/vi/"+id+"/hqdefault.jpg",
                id: id
            });
        });
    }

    return loadedVideos[id];
}
