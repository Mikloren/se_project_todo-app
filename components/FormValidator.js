class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  showInputError(inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  hideInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = this._formEl.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  hasInvalidInput = (_inputList) => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = (_inputList, _buttonElement) => {
    if (this.hasInvalidInput(this._inputList)) {
      _buttonElement.classList.add(this._inactiveButtonClass);
      _buttonElement.disabled = true;
    } else {
      _buttonElement.classList.remove(this._inactiveButtonClass);
      _buttonElement.disabled = false;
    }
  };

  resetValidation(_inputList, _buttonElement) {
    this._formEl.reset();
    this._toggleButtonState(this._inputList, this._buttonElement);
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      this.resetValidation();
      evt.preventDefault();
    });
    this.setEventListeners();
  }
}

export default FormValidator;
