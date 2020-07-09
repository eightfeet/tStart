import Modal from '@eightfeet/modal';
import { Message } from '~/types/message';

const style = {
    // 定义modal样式 {overlay: 覆盖层, content: 内容区, close: 关闭按钮}
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: '0.4em',
        width: '20em',
        padding: '1em',
    },
    close: {
        backgroundImage:
            "url('http://cdn-yyj.4000916916.com/pic/20200707close.png')",
        backgroundSize: '100% 100%',
        width: '2em',
        height: '2em',
        top: '-3em',
        right: '0',
    },
    // modify(修饰层)层级按照zIndex（modal的层级）以2为步值递增
    modify: [],
};

const confirmationResultModal = new Modal({
    style,
});

const resultModal = new Modal({
    style,
});

const config = function ({ title, message, cancel, confirmation }: Message) {
    return {
        header: title ? `<h3 class="messagetitle">${title}</h3>` : '',
        article: message
            ? `<div class="messagecontent"><div class="messagemain">
      ${message}
    </div></div>`
            : '',
        footer: `
    ${confirmation ?? `<button class="button ok modalsubmit">确定</button>`}
    ${cancel ?? `<button class="button modalcancel">取消</button>`}
    `,
    };
};

function handleBtn(Md: any, onConfirmation: () => void, onCancel: () => void) {
    const root = document.getElementById(Md.state.id);
    const submitBtn = root.querySelector('.modalsubmit');
    const cancelBtn = root.querySelector('.modalcancel');
    if (submitBtn) {
        (submitBtn as any).onclick = function () {
            onConfirmation && onConfirmation();
            Md.hide();
        };
    }
    if (cancelBtn) {
        (cancelBtn as any).onclick = function () {
            onCancel && onCancel();
            Md.hide();
        };
    }
}

function result({
    title,
    message,
    onCancel,
    onConfirmation,
    cancel,
    confirmation,
}: Message): Promise<any> {
    if (typeof onCancel === 'function') {
        confirmationResultModal.state.onCancel = onCancel;
    }
    return confirmationResultModal
        .create(config({ title, message, cancel: cancel ?? '', confirmation }))
        .then(() => {
            handleBtn(confirmationResultModal, onConfirmation, onCancel);
            return confirmationResultModal;
        });
}

function confirmationResult({
    title,
    message,
    onCancel,
    onConfirmation,
    cancel,
    confirmation,
}: Message): Promise<any> {
    return resultModal
        .create(config({ title, message, cancel, confirmation }))
        .then(() => {
            handleBtn(resultModal, onConfirmation, onCancel);
            return resultModal;
        });
}

export default {
    confirmationResult,
    result,
};
