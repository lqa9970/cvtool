import { Divider, Header, Label } from "semantic-ui-react";

type LabelGroupProps = {
  title: string;
  labels: string[];
};

export default function LabelGroup({ title, labels }: LabelGroupProps) {
  return (
    <>
      <Divider horizontal>
        <Header as="h3" id="preview-left-col-header">
          {title}
        </Header>
      </Divider>
      <Label.Group size="medium">
        {labels.map((name) => (
          <Label key={name}>{name}</Label>
        ))}
      </Label.Group>
    </>
  );
}
