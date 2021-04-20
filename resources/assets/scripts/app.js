import "../sass/app.scss";
import "../vendor/tailwind.css";
import { searchItem } from "./api";

const input = $("#textInput");
const results = $("#results");
const starter = $("#starter");
const empty = $("#empty");
const template = document.getElementById("item-card").innerText;
const compiledTemplate = Handlebars.compile(template);

/**
 * main function to search query
 * TODO: pagination
 * @param {*} query
 * @returns
 */
async function searchValue(query) {
  try {
    const items = await searchItem(query);
    if (items.length === 0) return results.html(empty.html());
    const data = items
      .map((d) => {
        // random image
        d.image = `https://picsum.photos/seed/${d.name}/200/200`;
        return compiledTemplate(d);
      })
      .join();
    results.html(data);
  } catch (e) {
    console.log(e);
    alert(e.message);
    results.html(starter.html());
  }
}

/**
 * entry point
 */
$(document).ready(() => {
  // listen keyword search handler
  const input$ = Rx.Observable.fromEvent(input, "keyup")
    .map((x) => x.currentTarget.value)
    .debounceTime(500);
  input$.subscribe((x) => searchValue(x));

  // display initial
  results.html(starter.html());

  searchValue("");

  $("a[href='/home']").addClass("bg-gray-900");
});
