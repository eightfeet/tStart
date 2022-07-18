import s from "./css.scss";
class Test {
	constructor(parameters: any) {
		console.log(parameters, s);
	}
}

new Test({});

document.body.classList.add('aaaa');
document.body.innerHTML = `<h2 class="${s.aaaa}">这个是标题</h2>`;
export default Test;