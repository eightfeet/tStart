import s from "./style.scss";
import Modal from '@eightfeet/modal';
import a from "./../style/common.scss";
class Test {
	constructor(parameters: any) {
		console.log(parameters, s);
	}
}

document.getElementById('root').innerHTML = 'Hello word!';
document.getElementById('root').classList.add(s.test, a.bolder);

const md = new Modal({});
md.create({article: '0000'});
new Test({});
export default Test;