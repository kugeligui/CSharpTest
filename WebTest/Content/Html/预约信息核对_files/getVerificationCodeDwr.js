
function getVerificationCodeDwr() { }
getVerificationCodeDwr._path = '/onlinebook/dwr';

getVerificationCodeDwr.getVerificationCode = function(p0, p1, callback) {
    DWREngine._execute(getVerificationCodeDwr._path, 'getVerificationCodeDwr', 'getVerificationCode', p0, p1, callback);
}
