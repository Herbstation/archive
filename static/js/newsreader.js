var no_article = document.getElementById("no_article");
var article = document.getElementById("article");
var copyright_text = document.getElementById("copyright_text");
var publisher_body = document.getElementById("publisher_body");
var article_head = document.getElementById("article_head");
var article_subt = document.getElementById("article_subt");
var article_auth = document.getElementById("article_auth");
var article_date = document.getElementById("article_date");
var article_body = document.getElementById("article_body");

var current_article_selector = null;
function setArticle(elem) {
    current_article_selector?.classList.remove("selected")

    if (elem === current_article_selector) {
        current_article_selector = null;
        no_article.style.display = 'flex';
        article.style.display = 'none';
        return
    }

    no_article.style.display = 'none';
    article.style.display = 'flex';

    current_article_selector = elem;
    current_article_selector.classList.add("selected")

    if (elem.dataset.copyright_text) {
        copyright_text.parentElement.style.display = 'inline';
        copyright_text.innerHTML = `Copyright © 2025 ${elem.dataset.copyright_text}`;
    } else {
        copyright_text.parentElement.style.display = 'none';
        copyright_text.innerHTML = null;
    }

    if (elem.dataset.publisher_body) {
        publisher_body.style.display = 'inline';
        publisher_body.innerHTML = elem.dataset.publisher_body;
    } else {
        publisher_body.style.display = 'none';
        publisher_body.innerHTML = null;
    }

    if (elem.dataset.article_head) {
        article_head.parentElement.style.display = 'inline';
        article_head.innerHTML = elem.dataset.article_head;
    } else {
        article_head.parentElement.style.display = 'none';
        article_head.innerHTML = null;
    }

    if (elem.dataset.article_subt) {
        article_subt.parentElement.style.display = 'inline';
        article_subt.innerHTML = elem.dataset.article_subt;
    } else {
        article_subt.parentElement.style.display = 'none';
        article_subt.innerHTML = null;
    }

    if (elem.dataset.article_auth) {
        article_auth.parentElement.style.display = 'inline';
        article_auth.innerHTML = `Author: ${elem.dataset.article_auth}`;
    } else {
        article_auth.parentElement.style.display = 'none';
        article_auth.innerHTML = null;
    }

    if (elem.dataset.article_date) {
        article_date.parentElement.style.display = 'inline';
        article_date.innerHTML = elem.dataset.article_date;
    } else {
        article_date.parentElement.style.display = 'none';
        article_date.innerHTML = null;
    }

    if (elem.dataset.article_body) {
        article_body.style.display = 'inline';
        article_body.innerHTML = elem.dataset.article_body;
    } else {
        article_body.style.display = 'none';
        article_body.innerHTML = null;
    }
}

var article_element_lookup = []
Array.from(document.getElementsByClassName("selector")).forEach((elem) => {
    article_element_lookup[elem.dataset.article_id] = elem;
    
    elem.addEventListener("click", () => {
        setArticle(elem);
    });
});

window.addEventListener("load", () => {
    if (window.location.hash) {
        setArticle(article_element_lookup[window.location.hash.replace("#", "")]);
        window.history.replaceState(null, "", window.location.pathname);
    }
});