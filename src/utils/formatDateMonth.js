export default function formatDateMonth(m) {
    let t = '';
    
    switch (m) {
        case 'Jan':
            t = 0
            break;
        case 'Feb':
            t = 1
            break;
        case 'Mar':
            t = 2
            break;
        case 'Apr':
            t = 3
            break;
        case 'May':
            t = 4
            break;
        case 'Jun':
            t = 5
            break;
        case 'Jul':
            t = 6
            break;
        case 'Aug':
            t = 7
            break;
        case 'Sep':
            t = 8
            break;
        case 'Oct':
            t = 9
            break;
        case 'Nov':
            t = 10
            break;
        case 'Dec':
            t = 11
            break;
    }
    return t;
}