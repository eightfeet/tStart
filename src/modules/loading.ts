import Loading from '@eightfeet/loading';

var loading = new Loading({
    cycleTime: 1,
    parentId: 'parentId',
    style: {
        overlay: {
            backgroundColor: 'rgba(0,0,0,0)',
        },
        content: {
            backgroundColor: 'rgba(0,0,0,0)',
        },
        vertices: {
            height: '0.5em',
            width: '2px',
            borderRadius: '1em',
            backgroundColor: '#ffae6f ',
            size: '25px',
        },
    },
});

export default loading;
