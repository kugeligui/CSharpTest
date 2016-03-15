
function bookingTypeDwr() { }
bookingTypeDwr._path = '/onlinebook/dwr';

bookingTypeDwr.listBookingTypeForSelectLabel = function(p0, callback) {
    DWREngine._execute(bookingTypeDwr._path, 'bookingTypeDwr', 'listBookingTypeForSelectLabel', p0, callback);
}
