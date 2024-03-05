class Validation {
    checkEmpty(value, elementErrorID, messageError) {
        if (value === "") {
            document.getElementById(elementErrorID).innerHTML = messageError;
            return false;
        }
        document.getElementById(elementErrorID).innerHTML = "";
        return true;
    }

    checkEmail(value, elementErrorID, messageError) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(value)) {
            document.getElementById(elementErrorID).innerHTML = messageError;
            return false;
        }
        document.getElementById(elementErrorID).innerHTML = "";
        return true;
    }

    checkScores(value, elementErrorID, messageError, min, max) {
        let val = value * 1;
        if (val < min || val > max) {
            document.getElementById(elementErrorID).innerHTML = messageError;
            return false;
        }
        document.getElementById(elementErrorID).innerHTML = "";
        return true;
    }
}

export default Validation;
