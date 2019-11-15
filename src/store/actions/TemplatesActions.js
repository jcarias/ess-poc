export const ADD_TEMPLATE = "ADD_TEMPLATE";
export const DELETE_TEMPLATE = "DELETE_TEMPLATE";
export const UPDATE_TEMPLATE = "UPDATE_TEMPLATE";

export const addTemplateAction = template => ({
  type: ADD_TEMPLATE,
  payload: template
});

export const updateTemplateAction = template => ({
  type: UPDATE_TEMPLATE,
  payload: template
});

export const deleteTemplate = template => ({
  type: DELETE_TEMPLATE,
  payload: template
});
