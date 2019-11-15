export const FormElementsTypes = {
  fieldTypes: [
    { value: "text", label: "Text field", initials: "TF" },
    { value: "select", label: "Combo box", initials: "CB" },
    { value: "checkbox", label: "Check box", initials: "CK" },
    { value: "radio", label: "Radio group", initials: "RG" }
  ],

  uiElements: [
    { value: "divider", label: "Divider", initials: "DV" },
    { value: "textBlock", label: "Text Block", initials: "TB" }
  ]
};

function isValueItemOfType(fieldsOfType, item) {
  const indexFound = fieldsOfType.findIndex(field => field.name === item.name);
  return indexFound >= 0;
}

export const parseFormDataIntoESignData = (values, fields) => {
  let retVal = {
    textFields: [],
    checkboxFields: []
  };

  //Convert values into an array
  const valuesArray = Object.keys(values).map(key => ({
    name: key,
    value: values[key]
  }));

  //Filter for fields to render text as output
  const formTextFields = fields.filter(
    aField => ["text", "select"].indexOf(aField.type) >= 0
  );

  //Filter for fields to render a checkbox
  const formCheckboxFields = fields.filter(
    aField => aField.type === "checkbox"
  );

  for (let i = 0; i < valuesArray.length; i++) {
    const valueItem = valuesArray[i];

    if (isValueItemOfType(formTextFields, valueItem)) {
      retVal.textFields.push({ ...valueItem, readonly: true });
    }
    if (isValueItemOfType(formCheckboxFields, valueItem)) {
      retVal.checkboxFields.push({ ...valueItem, readonly: true });
    }
  }

  return retVal;
};
