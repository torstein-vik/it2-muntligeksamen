var loadedVideos = {};

function load(id){
    var loaded = new $.Deferred();

    if(loadedVideos[id]){
        loaded.resolveWith(loadedVideos[id]);
    } else {
        var iframe = $("<iframe id='"+id+"' src='https://youtube.com/embed/"+id+"'>");

        iframe.on("load", (e) => {

            console.log($("iframe#"+id).contents());

        });

        $("iframes").append(iframe);


    }

    return loaded;
}
