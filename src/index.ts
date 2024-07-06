import "./style.css";
import printMe from "./print";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");

  // Lodash, now imported by this script
  element.innerHTML = ["Hello", "webpack"].join(" ");

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
