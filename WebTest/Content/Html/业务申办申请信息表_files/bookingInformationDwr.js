
function bookingInformationDwr() { }
bookingInformationDwr._path = '/onlinebook/dwr';

bookingInformationDwr.countAllBookingAmount = function(p0, p1, callback) {
    DWREngine._execute(bookingInformationDwr._path, 'bookingInformationDwr', 'countAllBookingAmount', p0, p1, callback);
}

bookingInformationDwr.countSameBookingOnSameDay = function(p0, p1, p2, callback) {
    DWREngine._execute(bookingInformationDwr._path, 'bookingInformationDwr', 'countSameBookingOnSameDay', p0, p1, p2, callback);
}

bookingInformationDwr.checkWorkDay = function(p0, callback) {
    DWREngine._execute(bookingInformationDwr._path, 'bookingInformationDwr', 'checkWorkDay', p0, callback);
}

bookingInformationDwr.checkPreTime = function(p0, p1, callback) {
    DWREngine._execute(bookingInformationDwr._path, 'bookingInformationDwr', 'checkPreTime', p0, p1, callback);
}

bookingInformationDwr.checkHasLock = function(p0, p1, p2, p3, p4, callback) {
    DWREngine._execute(bookingInformationDwr._path, 'bookingInformationDwr', 'checkHasLock', p0, p1, p2, p3, p4, callback);
}

bookingInformationDwr.checkHasLockToFz = function(p0, p1, p2, callback) {
    DWREngine._execute(bookingInformationDwr._path, 'bookingInformationDwr', 'checkHasLockToFz', p0, p1, p2, callback);
}

bookingInformationDwr.checkInSystemWork = function(callback) {
    DWREngine._execute(bookingInformationDwr._path, 'bookingInformationDwr', 'checkInSystemWork', callback);
}
