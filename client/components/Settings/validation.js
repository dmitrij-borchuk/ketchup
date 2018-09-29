export default (values) => {
  const errors = {};

  if (!values.sessions || !values.sessions.length) {
    errors.sessions = { _error: 'At least one member must be entered' };
  } else {
    const itemsArrayErrors = values.sessions.map((session) => {
      const itemErrors = {};
      if (!session || !session.name) {
        itemErrors.name = 'Required';
      }
      if (!session || !session.length) {
        itemErrors.length = 'Required';
      }
      return itemErrors;
    });

    if (itemsArrayErrors.length) {
      errors.sessions = itemsArrayErrors;
    }
  }

  return errors;
};
