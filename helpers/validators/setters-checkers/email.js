const setEmail = function () {
    this.isEmail = true;
    return (this);
};

const isEmail = (mail) => {
    let mailPattern = /^[\w.!#$%&'*+\/=?^_`{|}~-]{1,50}@[a-zA-Z0-9]{1,50}\.[a-zA-Z0-9]{1,50}$/;
    return (mailPattern.test(mail));
};

module.exports = {
    setEmail,
    isEmail
};