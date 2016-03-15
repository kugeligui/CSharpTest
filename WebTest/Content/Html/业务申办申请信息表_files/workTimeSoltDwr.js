
function workTimeSoltDwr() { }
workTimeSoltDwr._path = '/onlinebook/dwr';

workTimeSoltDwr.listWorkTimeSoltByRegistrationAreaOid = function(p0, p1, callback) {
    DWREngine._execute(workTimeSoltDwr._path, 'workTimeSoltDwr', 'listWorkTimeSoltByRegistrationAreaOid', p0, p1, callback);
}

workTimeSoltDwr.findIfSameRecord = function(p0, p1, p2, p3, callback) {
    DWREngine._execute(workTimeSoltDwr._path, 'workTimeSoltDwr', 'findIfSameRecord', p0, p1, p2, p3, callback);
}

workTimeSoltDwr.findMissBookRelease = function(p0, callback) {
    DWREngine._execute(workTimeSoltDwr._path, 'workTimeSoltDwr', 'findMissBookRelease', p0, callback);
}
