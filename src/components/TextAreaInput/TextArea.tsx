import React, { useState, useEffect } from "react";
import { TextArea, Grid, Container, Comment } from "semantic-ui-react";

import "./TextArea.scss";

type TextAreaInputProps = {
  id: string;
  value: string;
  name: string;
  characterLimit: number;
  placeholder: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onExceedLimit: (exceeded: boolean) => void;
};

function TextAreaInput({
  id,
  value,
  name,
  placeholder,
  handleChange,
  onExceedLimit,
  characterLimit,
}: TextAreaInputProps) {
  const [charCount, setCharCount] = useState(0);
  const [isExceeded, setIsExceeded] = useState(false);

  // Set initial character count
  useEffect(() => {
    setCharCount(value.length);
    setIsExceeded(value.length > characterLimit);
  }, [value, characterLimit]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCharCount = event.target.value.length;
    const exceeded = newCharCount > characterLimit;

    handleChange(event);
    setCharCount(newCharCount);
    setIsExceeded(exceeded);
    onExceedLimit(exceeded);
  };

  return (
    <Grid>
      <Grid.Column>
        <Container className="input-container">
          <TextArea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            rows={6}
            onChange={handleInputChange}
          />

          <Comment.Content
            className={isExceeded ? "character-limit-exceeded" : ""}
          >
            {charCount}/{characterLimit}
          </Comment.Content>
        </Container>
        {isExceeded && (
          <Comment.Content className="character-limit-exceeded">
            Character limit exceeded
          </Comment.Content>
        )}
      </Grid.Column>
    </Grid>
  );
}

export default TextAreaInput;
