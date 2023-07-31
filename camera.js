function openCamera() {
    var video = document.querySelector('video');
    navigator.mediaDevices = navigator.mediaDevices
    || ((navigator.mozGetUserMedia 
    || navigator.webkitGetUserMedia) ? {
        getUserMedia: function(c) {
            return new Promise(function(y, n) {
                (navigator.mozGetUserMedia ||
                navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
        }
    } : null);
    // var constraints = { video: { facingMode: 'environment', width: 1280, height: 720 } };
    // navigator.mediaDevices.getUserMedia(constraints)
    //     .then(function(stream) {
    //         video.srcObject = stream;
    //         video.onloadedmetadata = function(e) {
    //             video.play();
    //         };
    //     })
    //     .catch(function(err) {
    //         console.log(err);
    //     });

    const v = video
    const c = picture
    
    const constraints = {
        audio: false,
        video: {
        width: 480,
        height: 640,
        facingMode: "environment"
        }
    };
      
    navigator.mediaDevices.getUserMedia(constraints)
      .then( (stream) => {
        v.srcObject = stream;
        v.onloadedmetadata = (e) => {
          v.play();
        };
      })
      .catch( (err) => {
        console.log(err.name + ":" + err.message);
      });




    document.querySelector("#saveImage").addEventListener("click", () => {
        const ctx = c.getContext("2d");
        v.pause();
        setTimeout( () => {
            v.play();
        }, 1000);

        ctx.drawImage(v, 0, 0, c.width, c.height);

        c.toBlob(function(blob) {
            var img = document.createElement("img");
            url = URL.createObjectURL(blob);
            img.onload = function() {
                URL.revokeObjectURL(url);
            }

            const fd = new FormData();
            fd.append("picture", blob);
    
            // const param = {
            //     method: "POST",
            //     body: fd
            // }
        
            // fetch("/test.php", param)
            // .then((res)=>{
            //     if (res) {
            //         console.log(res)
            //     }
            // })
            // .then(result => {
            //     if (result) {
            //         console.log(result)
            //     }
            // })
            // .catch((error)=>{
            //     console.log('Error:', error)
            // });
        });
    });

}
