import { useField } from "formik";
import { Container, Comment } from "semantic-ui-react";
import "./ErrorMessage.scss";

type ErrorMessageProps = {
  fieldName: string;
  charLimit?: number;
};
function ErrorMessage({ fieldName, charLimit }: ErrorMessageProps) {
  const [field, meta] = useField(fieldName);

  if (!meta.touched || !meta.error) {
    return null; // Don't render anything if the field hasn't been touched or has no error
  }

  return (
    <Container className="error-message-container">
      <Comment.Content className="error">{meta.error}</Comment.Content>
      {charLimit && (
        <Comment.Content className="limit">
          {(field.value as string).length}/{charLimit}
        </Comment.Content>
      )}
    </Container>
  );
}

export default ErrorMessage;
