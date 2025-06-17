Array.from(document.getElementsByClassName("replace_link")).forEach((elem) => {
    if (elem.dataset.true_permalink) {
        elem.href = elem.dataset.true_permalink;
    }
});