
function workDayDwr() { }
workDayDwr._path = '/onlinebook/dwr';

workDayDwr.listWorkDayByRegistrationAreaOid = function(p0, callback) {
    DWREngine._execute(workDayDwr._path, 'workDayDwr', 'listWorkDayByRegistrationAreaOid', p0, callback);
}
