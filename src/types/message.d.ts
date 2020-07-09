export interface Message {
    /**
     * 标题
     */
    title?: string;
    /**
     * 消息内容
     */
    message?: string;
    /**
     * 取消回调
     */
    onCancel?: () => void;
    /**
     * 确定回调
     */
    onConfirmation?: () => void;
    /**
     * 取消按钮
     */
    cancel?: any;
    /**
     * 确定按钮
     */
    confirmation?: any;
}
