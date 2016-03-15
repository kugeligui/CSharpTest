
function bookingLockDwr() { }
bookingLockDwr._path = '/onlinebook/dwr';

bookingLockDwr.isBookingLock = function(p0, p1, callback) {
    DWREngine._execute(bookingLockDwr._path, 'bookingLockDwr', 'isBookingLock', p0, p1, callback);
}
