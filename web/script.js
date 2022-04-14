const pick = document.querySelector.bind(document);
const fwEvents = ['fwBlur', 'fwChange', 'fwFocus', 'fwInput', 'fwInputClear', 'fwSelect', 'fwDeselect'];
const logArea = pick('.table');

var scooby_doo_tab = {
  input: pick('.input'),
  select: pick('.select'),
  datepicker: pick('.datepicker'),
  checkbox: pick('.checkbox'),
  dropdown: pick('.dropdown'),
  radioGroup: pick('.radio-group'),
  radioButton: pick('.radio-button'),
  submitBtn: pick('.submit-btn'),
  cancelBtn: pick('.cancel-btn'),
  learnMoreBtn: pick('.learn-more-btn')
};

var boo_boo_tab = {
  textArea: pick('.text-area'),
  toggle: pick('.toggle'),
  knowBtn: pick('.know-btn'),
  toastBtn: pick('.toast-btn')
};

var all_fields = {
  ...scooby_doo_tab,
  ...boo_boo_tab,
  [Symbol.iterator]() {
    let fields = Object.keys(this);
    let count = 0;
    return {
      next: () => {
        if (count < fields.length) {
          let value = this[fields[count]];
          count++;
          return {
            value,
            done: false
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  }
};

const fields = all_fields[Symbol.iterator]();

var isDone = true;

do {
  var { value: field, done: isDone } = fields.next();

  fwEvents.forEach(listenToScoobyFormField);

  function listenToScoobyFormField(fwEvent) {
    if (field) {
      if (field.isEqualNode(boo_boo_tab.toastBtn)) {
        boo_boo_tab.toastBtn.addEventListener(fwEvent, () => {
          pick('#toast').trigger({ type: 'success', content: 'Cheers! 🍸 ' });
        });
      }

      field.addEventListener(fwEvent, appendOnEventEmit(fwEvent));
    }
  }

  function appendOnEventEmit(fwEvent) {
    return function (event) {
      const row = `
        <tr>
            <td>${fwEvent}</td>
            <td>${event.target.nodeName}</td>
        </tr>
        `;
      logArea.insertAdjacentHTML('beforeend', row);
    };
  }
} while (!isDone);
