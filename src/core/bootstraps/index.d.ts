interface Searchs {
    jwt?: string;
}
declare const _default: ({ jwt }: Searchs) => Promise<{
    member: any;
    isLogin: boolean;
}>;
export default _default;
