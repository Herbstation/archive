var modal = document.getElementById("gallery_modal");
var modal_media_contents = document.getElementById("modal_media_contents");
var modal_media_box = document.getElementById("modal_media_box");
var modal_attribution = document.getElementById("modal_attribution");
var modal_title = document.getElementById("modal_title");
var modal_text = document.getElementById("modal_text");

function setModalMedia(elem) {
    modal.showModal()
    modal.dataset.current_media = elem.dataset.media_id;
    modal_attribution.innerText = `${modal_attribution.dataset.prefixedtext}${elem.dataset.author}`;
    modal_title.innerText = elem.dataset.title;
    modal_text.innerHTML = elem.dataset.desc;

    if (elem.dataset.type === "image") {
        if (!modal_image) {
            addModalImage();
        }
        modal_image.src = elem.src;
        setTimeout(updateModalMediaDimensions(modal_image), 0);
    } else {
        if (!modal_video) {
            addModalVideo();
        }
        modal_video.src = elem.src;
        setTimeout(updateModalMediaDimensions(modal_video), 0);
    }
}

var modal_image
function addModalImage() {
    modal_video?.remove()
    modal_video = null;

    modal_image = document.createElement("img");
    modal_image.classList.add("modal_media");
    modal_media_box.insertBefore(modal_image, modal_attribution);
}

var modal_video
function addModalVideo() {
    modal_image?.remove()
    modal_image = null;

    modal_video = document.createElement("video");
    modal_video.classList.add("modal_media");
    modal_video.controls = true;
    modal_media_box.insertBefore(modal_video, modal_attribution);
}

// Set up the media dimensions, as object-fit does not work with the media box.
function updateModalMediaDimensions(elem) {
    var max_width = screen.width * 0.8;
    var max_height = modal_media_contents.clientHeight + elem.clientHeight - modal_media_box.clientHeight;

    elem.style.width = `${max_width}px`;
    elem.style.height = 'auto';

    if (elem.clientHeight > max_height) {
        elem.style.height = `${max_height}px`;
        elem.style.width = 'auto';
    }
}

function navigateGallery(amt) {
    var index = media_id_lookup.indexOf(modal.dataset.current_media);
    modal_attribution.innerText = `${index}`;
    index += amt;
    
    if (index >= media_id_lookup.length) {
        index -= media_id_lookup.length;
    } else if (0 > index) {
        index += media_id_lookup.length;
    }

    setModalMedia(media_element_lookup[media_id_lookup[index]])
}


modal.addEventListener("keydown", (event) => {
    if (!modal.open) {
        return;
    }
    switch (event.key) {
        case "ArrowLeft":
            navigateGallery(-1);
            break;
        case "ArrowRight":
            navigateGallery(1);
            break;
    }
});

modal.addEventListener("close", () => {
    modal_video?.pause();
});

Array.from(document.getElementsByClassName("image_link")).forEach((elem) => {
    elem.removeAttribute("href")
});

var media_id_lookup = []
var media_element_lookup = []
Array.from(document.getElementsByClassName("gallery_media")).forEach((elem) => {
    media_id_lookup.push(elem.dataset.media_id);
    media_element_lookup[elem.dataset.media_id] = elem;

    elem.addEventListener("click", () => {
        setModalMedia(elem)
    });
});

document.getElementById("close_modal").addEventListener("click", () => {
    modal.close();
});

document.getElementById("left_arrow").addEventListener("click", () => {
    navigateGallery(-1);
});

document.getElementById("right_arrow").addEventListener("click", () => {
    navigateGallery(1);
});


if (window.location.hash) {
    setModalMedia(media_element_lookup[window.location.hash.replace("#", "")]);
    window.history.replaceState(null, "", window.location.pathname);
}