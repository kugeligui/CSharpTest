
function bookWebActionDwr() { }
bookWebActionDwr._path = '/onlinebook/dwr';

bookWebActionDwr.bookingSzAreaChange = function(p0, p1, p2, callback) {
    DWREngine._execute(bookWebActionDwr._path, 'bookWebActionDwr', 'bookingSzAreaChange', p0, p1, p2, callback);
}

bookWebActionDwr.bookingXLChange = function(p0, p1, callback) {
    DWREngine._execute(bookWebActionDwr._path, 'bookWebActionDwr', 'bookingXLChange', p0, p1, callback);
}
