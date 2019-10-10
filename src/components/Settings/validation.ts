import { ISession } from "../../types/session.interface";

export const settingsFormValidator = (values: any) => {
  const errors: any = {};

  if (!values.sessions || !values.sessions.length) {
    errors.sessions = { _error: 'At least one member must be entered' };
  } else {
    const itemsArrayErrors = values.sessions.map((session: ISession) => {
      const itemErrors: any = {};
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
