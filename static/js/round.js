var modal = document.getElementById("gallery_modal");
var modal_image_contents = document.getElementById("modal_image_contents");
var modal_image_box = document.getElementById("modal_image_box");
var modal_image = document.getElementById("modal_image");
var modal_attribution = document.getElementById("modal_attribution");
var modal_title = document.getElementById("modal_title");
var modal_text = document.getElementById("modal_text");

function setModalImage(img) {
    modal.style.display = "block";
    modal.dataset.current_image = img.src;
    modal_image.src = img.src;
    modal_attribution.innerText = `contributed by ${img.dataset.author}`;
    modal_title.innerText = img.dataset.title;
    modal_text.innerHTML = img.dataset.desc;

    // Set up the image dimensions, as object-fit does not work with the image box.
    var max_width = screen.width * 0.8;
    var max_height = modal_image_contents.clientHeight + modal_image.clientHeight - modal_image_box.clientHeight;

    modal_image.style.width = `${max_width}px`;
    modal_image.style.height = 'auto';

    if (modal_image.clientHeight > max_height) {
        modal_image.style.height = `${max_height}px`;
        modal_image.style.width = 'auto';
    }
}

var image_path_lookup = []
var image_element_lookup = []
Array.from(document.getElementsByClassName("gallery_image")).forEach((img) => {
    image_path_lookup.push(img.src);
    image_element_lookup[img.src] = img;
});

function navigateModalImages(amt) {
    var index = image_path_lookup.indexOf(modal.dataset.current_image);
    modal_attribution.innerText = `${index}`;
    index += amt;
    
    if (index >= image_path_lookup.length) {
        index -= image_path_lookup.length;
    } else if (0 > index) {
        index += image_path_lookup.length;
    }

    setModalImage(image_element_lookup[image_path_lookup[index]])
}

function closeModal() {
    modal.style.display = "none";
}