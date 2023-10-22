const setCookie = (name, value, minutesToExpire) => {
    const date = new Date();
    date.setTime(date.getTime() + minutesToExpire * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export default setCookie;
